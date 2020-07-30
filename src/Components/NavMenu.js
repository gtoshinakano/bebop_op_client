import React from 'react'
import { Menu, Label } from 'semantic-ui-react'
import socket from "../utils/socket-lib"

const NavMenu = () => {

  const [droneConnected, setConnected] = React.useState(false)
  const [batteryLevel, setBatteryLevel] = React.useState(0)
  const [gpsObj, setGpsObj] = React.useState({})

  React.useEffect(() => {
    socket.on("drone_connected", (con) => setConnected(con))
    socket.on("battery_level", data => setBatteryLevel(data))
    socket.on("gps_position_changed", data => setGpsObj(data))
  })

  return(
    <Menu>
      <Menu.Item header>
        Bebop Status
      </Menu.Item>
      <Menu.Item>
        {droneConnected ? "Connected" : "Disconnected"}
      </Menu.Item>
      <Menu.Item>
        GPS: {JSON.stringify(gpsObj)}
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item header>
          <Label
            icon={batteryIcon(batteryLevel)}
            color="green"
            content={batteryLevel}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

const batteryIcon = (lvl) => {
  let suffix
  if(lvl >= 95) suffix = "full"
  else if(lvl >= 75 && lvl < 95) suffix = "three quarters"
  else if(lvl >= 50 && lvl < 75) suffix = "half"
  else if(lvl >= 20 && lvl < 50) suffix = "quarter"
  else if(lvl < 20) suffix = "empty"
  return "battery " + suffix
}

export default NavMenu
