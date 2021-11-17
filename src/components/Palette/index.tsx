import "./Palette.css";

import { FC, useState } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import ColorBox from "../ColorBox";
import { GeneratedPalette } from "../../utils/colorHelpers";
import Navbar, { AcceptedFormats } from "../Navbar";
import { Redirect } from "react-router-dom";
import PaletteFooter from "../PaletteFooter";

const styles: { [key: string]: any } = {
  Palette: {
    height: "100vh",
    /* remove overflow if it makes any problem.
     * I added this to hide overflow when clicking on ColorBox
     */
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  colors: {
    height: "90%",
  },
};

interface PaletteProps extends WithStyles<typeof styles> {
  palette: GeneratedPalette | null;
}

const Palette: FC<PaletteProps> = props => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState<AcceptedFormats>("hex");

  // TODO: find a better solution
  if (!props.palette) return <Redirect to="/" />;

  const {
    classes,
    palette: { colors, paletteName, emoji, id },
  } = props;

  const onColorFormateChange = (colorFormat: AcceptedFormats) => {
    setFormat(colorFormat);
  };

  const onSliderValueChange = (level: number) => setLevel(level);

  const colorBoxes = colors[level].map(color => (
    <ColorBox
      key={color.id}
      background={color[format]}
      name={color.name}
      moreUrl={`/palette/${id}/${color.id}`}
      showFullPalette
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar
        level={level}
        onSliderValueChange={onSliderValueChange}
        onColorFormatChange={onColorFormateChange}
        showingAllColors
      />
      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default withStyles(styles)(Palette);
