import { FC } from "react";
import { IPalette } from "../../seedColors";

type PaletteProps = IPalette;

const Palette: FC<PaletteProps> = () => {
  return (
    <div className="Palette">
      {/* Navbar */}
      <div className="Palette-colors"></div>
      {/* Footer */}
    </div>
  );
};

export default Palette;
