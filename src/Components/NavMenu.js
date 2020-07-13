import React from 'react'
import { Menu } from 'semantic-ui-react'

const NavMenu = () => {

  const {droneConnected, setConnected} = React.useState(false)

  return(
    <Menu>
      <Menu.Item header>
        Bebop Status
      </Menu.Item>
      <Menu.Item>
        {droneConnected ? "Connected" : "Disconnected"}
      </Menu.Item>
    </Menu>
  )
}

export default NavMenu
