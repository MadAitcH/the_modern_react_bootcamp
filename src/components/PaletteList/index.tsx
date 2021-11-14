import { Component } from "react";
import { Link } from "react-router-dom";
import { IPalette } from "../../utils/seedColors";

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
          <p key={palette.id}>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
          </p>
        ))}
      </div>
    );
  }
}

export default PaletteList;
