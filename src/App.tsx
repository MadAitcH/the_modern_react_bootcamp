import { Component } from "react";
import Palette from "./components/Palette";
import { generatePalette } from "./utils/colorHelpers";
import seedColors from "./utils/seedColors";

class App extends Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    );
  }
}

export default App;
