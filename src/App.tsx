import Palette from "./components/Palette";
import seedColors from "./utils/seedColors";

function App() {
  return (
    <div className="App">
      <Palette {...seedColors[2]} />
    </div>
  );
}

export default App;
