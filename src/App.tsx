import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import NewPaletteForm from "./components/NewPaletteForm";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import { generatePalette } from "./utils/colorHelpers";
import seedColors, { IPalette } from "./utils/seedColors";

function App() {
  const [palettes, setPalettes] = useState<IPalette[]>(seedColors);

  const findPalette = (id: string) => {
    return palettes.find(palette => palette.id === id);
  };

  const savePalette = (newPalette: IPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList palettes={palettes} {...routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <NewPaletteForm
            {...routeProps}
            palettes={palettes}
            savePalette={savePalette}
          />
        )}
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
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
    </Switch>
  );
}

export default App;
