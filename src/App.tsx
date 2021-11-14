import { Switch, Route } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import { generatePalette } from "./utils/colorHelpers";
import seedColors from "./utils/seedColors";

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <PaletteList palettes={seedColors} />}
      />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
    </Switch>
  );
}

function findPalette(id: string) {
  return seedColors.find(palette => palette.id === id);
}

export default App;
