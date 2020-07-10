import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import socketIOClient from "socket.io-client";

import {Label} from "semantic-ui-react"

const ENDPOINT = "http://127.0.0.1:7575"

function App() {

  const [response, setResponse] = React.useState("Disconnected");

  React.useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("ping", data => {
      setResponse(data);
    });
    socket.on("disconnect", () => {
      setResponse('Disconnected')
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Label color="red">{response}</Label>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
