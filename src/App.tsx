import { Component } from "react";
import Board from "./components/Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board colCount={5} rowCount={5} chanceLightStartsOn={0.2} />
      </div>
    );
  }
}

export default App;
