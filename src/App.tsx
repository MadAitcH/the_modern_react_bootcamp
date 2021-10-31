import "./App.css";
import Die from "./components/Die";

function App() {
  return (
    <div className="App">
      <Die face={1} />
      <Die face={6} />
    </div>
  );
}

export default App;
