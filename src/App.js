import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import socket from "./utils/socket-lib";
import Main from './Components/Main'

import {Label, Icon} from "semantic-ui-react"

function App() {

  const [svConnected, setConnected] = React.useState(false)

  React.useEffect(() => {
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
            <Icon name="unlink" />Socket.io server is disconnected.
            <p>Trying to connect...</p>
          </Label>
        </header>
      </div>
    );
  else
    return(
      <Main />
    )
}

const styles = {
  spacer: {marginTop: 55  }
}

export default App;
