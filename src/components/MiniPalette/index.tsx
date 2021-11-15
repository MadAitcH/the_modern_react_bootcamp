import { FC } from "react";
import { WithStyles, withStyles } from "@mui/styles";

const styles = {
  main: {
    backgroundColor: "purple",
    border: "3px solid teal",
    "& h1": {
      color: "red",
    },
  },
  secondary: {
    backgroundColor: "black",
  },
  tertiary: {
    color: "blue",
  },
};

type MiniPaletteProps = WithStyles<typeof styles>;

const MiniPalette: FC<MiniPaletteProps> = ({ classes }) => {
  return (
    <div className={classes.main}>
      <h1>Mini Palette</h1>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
