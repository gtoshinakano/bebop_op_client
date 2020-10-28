import React from 'react'
import { Menu, Label, Button } from 'semantic-ui-react'
import socket from "../utils/socket-lib"

const NavMenu = () => {

  const [droneConnected, setConnected] = React.useState(false)
  const [batteryLevel, setBatteryLevel] = React.useState(0)
  const [gpsObj, setGpsObj] = React.useState({})
  const [availability, setAvailability] = React.useState(false)

  React.useEffect(() => {
    socket.on("drone_connected", (con) => setConnected(con))
    socket.on("battery_level", data => setBatteryLevel(data))
    socket.on("gps_position_changed", data => setGpsObj(data))
    socket.on("drone_can_mission", data => setAvailability(data))
  })

  const sendCommand = (data) => {
    socket.emit("cmd", data)
  }

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
      <Menu.Item>
        Available to Mission: {JSON.stringify(availability)}
      </Menu.Item>
      <Menu.Item>
        {/*<Button content="emit" primary icon="cog" onClick={emit} />*/}
        <Button content="Take Off" primary icon="cog" onClick={() => sendCommand({type:"take-off"})} />
        <Button content="Land" primary icon="cog" onClick={() => sendCommand({type:"land"})} />
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
