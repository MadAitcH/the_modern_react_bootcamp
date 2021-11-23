import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import NewPaletteForm from "./components/NewPaletteForm";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import { generatePalette } from "./utils/colorHelpers";
import seedColors, { IPalette } from "./utils/seedColors";
import { LOCAL_STORAGE_NAME } from "./constants";
import Page from "./components/Page";
import NotFound from "./components/NotFound";

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
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/"
                render={routeProps => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      {...routeProps}
                      deletePalette={deletePalette}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/new"
                render={routeProps => (
                  <Page>
                    <NewPaletteForm
                      {...routeProps}
                      palettes={palettes}
                      savePalette={savePalette}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                  <Page>
                    <Palette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                  <Page>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                render={() => (
                  <Page>
                    <NotFound />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default App;
