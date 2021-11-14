import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>Home</h1>} />
      <Route exact path="/palette/:id" render={() => <h1>Palette</h1>} />
    </Switch>
  );
}

export default App;
