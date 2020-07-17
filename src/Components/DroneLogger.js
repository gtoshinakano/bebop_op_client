import React from 'react'
import {Segment, Header, List, Icon} from 'semantic-ui-react'
import socket from "../utils/socket-lib";
import moment from 'moment'

const DroneLogger = () => {
  const [messages, setMessages] = React.useState([{
    timestamp: new Date(),
    msg: "Listening for server messages.."
  }])

  React.useEffect(() => {
    socket.on("flight_status", (data) => {
      let newMsgs = [...messages, {timestamp: new Date(), msg: data}]
      setMessages(newMsgs)
    })
  })

  const renderMsgs = () => {
    return (
      <List inverted>
        {messages.map(d => {
            return(
              <List.Item>
                <Icon name="right triangle"/>
                <List.Content>
                  <List.Header>
                    <span className="color-green">
                      {moment(d.timestamp).format('DD/MM/YY HH:mm:ss')}
                    </span>
                  </List.Header>
                  <List.Description>
                    <span>{d.msg}</span>
                  </List.Description>
                </List.Content>
              </List.Item>
            )
          })
        }
      </List>
    )
  }

  return(
    <Segment inverted>
      <Header
        color="green"
        content="Bebop Logger"
        icon="terminal"
        size="tiny"
      />
      {renderMsgs()}
    </Segment>
  )
}

export default DroneLogger
