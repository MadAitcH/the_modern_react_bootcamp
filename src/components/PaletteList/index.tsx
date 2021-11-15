import { Component } from "react";
import { IPalette } from "../../utils/seedColors";
import MiniPalette from "../MiniPalette";

interface PaletteListProps {
  palettes: IPalette[];
}

class PaletteList extends Component<PaletteListProps> {
  render() {
    const { palettes } = this.props;

    return (
      <div className="PaletteList">
        <h1>React Colors</h1>
        {palettes.map(palette => (
          <MiniPalette {...palette} />
        ))}
      </div>
    );
  }
}

export default PaletteList;
