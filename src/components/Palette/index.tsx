import { Component } from "react";
import { IPalette } from "../../seedColors";

type PaletteProps = IPalette;

class Palette extends Component<PaletteProps> {
  render() {
    return (
      <div className="Palette">
        {/* Navbar */}
        <div className="Palette-colors"></div>
        {/* footer */}
      </div>
    );
  }
}

export default Palette;
