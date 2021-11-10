import "./App.css";

import { Component } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Soda from "./components/Soda";
import Chips from "./components/Chips";
import Sardines from "./components/Sardines";
import VendingMachine from "./components/VendingMachine";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "")}
            to="/soda"
          >
            Soda
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "")}
            to="/chips"
          >
            Chips
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "")}
            to="/sardines"
          >
            Sardines
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<VendingMachine />} />
          <Route path="/soda" element={<Soda />} />
          <Route path="/chips" element={<Chips />} />
          <Route path="/sardines" element={<Sardines />} />
        </Routes>
      </div>
    );
  }
}

export default App;
