import "./App.css";

import { Component } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import VendingMachine from "./components/VendingMachine";
import Soda from "./components/Soda";
import Chips from "./components/Chips";
import Sardines from "./components/Sardines";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink exact activeClassName="link-active" to="/">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink exact activeClassName="link-active" to="/soda">
                Soda
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="link-active" to="/chips">
                Chips
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="link-active" to="/sardines">
                Sardines
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact render={() => <VendingMachine />} />
          <Route path="/soda" exact render={() => <Soda />} />
          <Route path="/chips" exact render={() => <Chips />} />
          <Route path="/sardines" exact render={() => <Sardines />} />
        </Switch>
      </div>
    );
  }
}

export default App;
