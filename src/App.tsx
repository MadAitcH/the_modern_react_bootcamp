import { Component } from "react";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Home</h1>} />
        <Route exact path="/palette/:id" render={() => <h1>palette</h1>} />
      </Switch>
    );
  }
}

export default App;
