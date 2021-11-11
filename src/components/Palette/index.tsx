import "./Palette.css";

import { Component } from "react";
import { IPalette } from "../../seedColors";
import ColorBox from "../ColorBox";

type PaletteProps = IPalette;

class Palette extends Component<PaletteProps> {
  render() {
    // TODO: add key
    const colorBoxes = this.props.colors.map(color => (
      <ColorBox background={color.color} name={color.name} />
    ));

    return (
      <div className="Palette">
        {/* Navbar */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}

export default Palette;
