import React from "react";

import { useWebsocketPose } from "./paperjs/use-websocket-pose";
import { getUrlParameters } from "./utils/get-url-parameters";

import "./App.css";

const DEFAULT_WS_URL = "localhost:8080";

function getWsUrl() {
  let url = DEFAULT_WS_URL;
  const params = getUrlParameters(window.location.href);
  if (params && params.url) {
    url = params.url;
  }

  return url;
}

function App() {
  const url = getWsUrl();
  useWebsocketPose({ url });

  return (
    <div className="App">
      <div className="url">ws://{url}</div>
    </div>
  );
}

export default App;
