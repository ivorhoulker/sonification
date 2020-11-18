import React, { useState } from "react";

import logo from "./logo.svg";

import "./App.css";

const App = () => {
  const [data, setData] = useState();
  const callApi = async () => {
    const response = await fetch("/api/covid");
    const body = await response.json();
    setData(body);
  };

  return (
    <div className="App">
      <button onClick={callApi}>Submit</button>
      <div>{data && JSON.stringify(data)}</div>
    </div>
  );
};

export default App;
