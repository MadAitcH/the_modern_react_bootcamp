import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NewPaletteForm from "./components/NewPaletteForm";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import { generatePalette } from "./utils/colorHelpers";
import seedColors, { IPalette } from "./utils/seedColors";
import { LOCAL_STORAGE_NAME } from "./constants";

function App() {
  const localPalettes = localStorage.getItem(LOCAL_STORAGE_NAME);
  const [palettes, setPalettes] = useState<IPalette[]>(
    localPalettes ? (JSON.parse(localPalettes) as IPalette[]) : seedColors
  );

  useEffect(() => {
    const syncLocalStorage = () => {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(palettes));
    };

    syncLocalStorage();
  }, [palettes]);

  const findPalette = (id: string) => {
    return palettes.find(palette => palette.id === id);
  };

  const savePalette = (newPalette: IPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = (id: string) => {
    setPalettes(palettes.filter(palette => palette.id !== id));
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList
            palettes={palettes}
            {...routeProps}
            deletePalette={deletePalette}
          />
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
