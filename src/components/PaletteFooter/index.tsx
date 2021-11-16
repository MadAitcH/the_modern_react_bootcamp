import { FC } from "react";

interface PaletteFooterProps {
  paletteName: string;
  emoji: string;
}

const PaletteFooter: FC<PaletteFooterProps> = ({ paletteName, emoji }) => {
  return (
    <footer className="Palette-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
};

export default PaletteFooter;
