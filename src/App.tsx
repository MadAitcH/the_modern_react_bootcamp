import ColorPalette from "./components/ColorPalette";

function App() {
  return (
    <div className="App">
      <ColorPalette
        boxCount={18}
        palette={[
          "pink",
          "yellow",
          "#137174",
          "rgb(99,199,29)",
          "rgba(255, 93, 38, 200)",
          "gold",
          "whitesmoke",
          "orange",
          "bisque",
          "brown",
          "burlywood",
          "cornflowerblue",
          "crimson",
          "darkorange",
          "darkseagreen",
          "tomato",
        ]}
      />
    </div>
  );
}

export default App;
