import React, { useState, useEffect } from "react";
import Wad from "web-audio-daw";
import "./App.css";

const App = () => {
  const [data, setData] = useState();

  //TODO: make the API data (data) affect the sound player (player)
  const player = new Wad.Poly();
  const sine = new Wad({ source: "sine" });
  player.add(sine);
  player.setVolume(0.5);

  const callApi = async () => {
    const response = await fetch("/api/covid");
    const body = await response.json();
    setData(body);
  };
  useEffect(() => {
    callApi();
  }, []);

  const play = () => {
    player.play({ pitch: "G#2" });
  };
  const stop = () => {
    player.stop();
  };

  return (
    <div className="App">
      <button onClick={play}>Start Sound</button>
      <button onClick={stop}>Stop Sound</button>
      <div>{data && JSON.stringify(data)}</div>
    </div>
  );
};

export default App;
