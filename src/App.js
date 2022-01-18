import React from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <header className="text-center "><h1 className="bg-gray">Tic-Tac-Toe</h1></header>
      <Game />
    </div>
  );
}

export default App;
