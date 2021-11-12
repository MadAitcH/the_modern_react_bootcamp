import Palette from "./components/Palette";
import { generatePalette } from "./utils/colorHelpers";
import seedColors from "./utils/seedColors";

function App() {
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
