import { FC, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { withStyles, WithStyles } from "@mui/styles";
import { GeneratedPalette } from "../../utils/colorHelpers";
import ColorBox from "../ColorBox";
import Navbar, { AcceptedFormats } from "../Navbar";
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
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      border: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      textDecoration: "none",
    },
  },
};

interface IColor {
  name: string;
  id: string;
  hex: string;
  rgb: string;
  rgba: string;
}

interface SingleColorPaletteProps extends WithStyles<typeof styles> {
  colorId: string;
  palette: GeneratedPalette | null;
}

const SingleColorPalette: FC<SingleColorPaletteProps> = ({
  colorId,
  palette,
  classes,
}) => {
  const [format, setFormat] = useState<AcceptedFormats>("hex");

  const gatherShades = (palette: GeneratedPalette, colorToFilterBy: string) => {
    const shades: IColor[] = [];
    const allColors = palette.colors;

    for (let key in allColors) {
      shades.push(
        ...allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  };

  // TODO: find a better solution
  if (!palette) {
    return <Redirect to="/" />;
  }

  const onColorFormatChange = (format: AcceptedFormats) => {
    setFormat(format);
  };

  const { paletteName, emoji, id } = palette;
  const shades = gatherShades(palette, colorId);

  const colorBoxes = shades.map(color => (
    <ColorBox key={color.name} name={color.name} background={color[format]} />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar onColorFormatChange={onColorFormatChange} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default withStyles(styles)(SingleColorPalette);
