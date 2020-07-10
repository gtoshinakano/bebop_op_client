import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import socketIOClient from "socket.io-client";

import {Label, Icon} from "semantic-ui-react"

const ENDPOINT = "http://127.0.0.1:7575"

function App() {

  const [svConnected, setConnected] = React.useState(false)

  React.useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("ping", data => {
      setConnected(true)
    });
    socket.on("disconnect", () => {
      setConnected(false)
    })
  }, []);
  if(!svConnected)
    return (
      <div className="App">
        <header className="App-header">
          <Icon color="grey" name="sync" size="massive" className="App-logo"/>
          <Label color="red" size="massive" style={styles.spacer}>
            <Icon name="unlink" />Socket.io server is disconnected
          </Label>
        </header>
      </div>
    );
  else
    return(
      "connected"
    )
}

const styles = {
  spacer: {marginTop: 55  }
}

export default App;
