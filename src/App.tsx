import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./components/NewPaletteForm";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import { generatePalette } from "./utils/colorHelpers";
import seedColors from "./utils/seedColors";

class App extends Component {
  findPalette(id: string) {
    return seedColors.find(palette => palette.id === id);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList palettes={seedColors} {...routeProps} />
          )}
        />
        <Route exact path="/palette/new" render={() => <NewPaletteForm />} />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
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
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
