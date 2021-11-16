import { FC } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import { IPalette } from "../../utils/seedColors";
import MiniPalette from "../MiniPalette";
import { RouteComponentProps } from "react-router-dom";

const styles: { [key: string]: any } = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "auto", // added by me
  },

  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },

  nav: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    color: "white",
  },

  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
  },
};

interface PaletteListProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {
  palettes: IPalette[];
}

const PaletteList: FC<PaletteListProps> = ({ palettes, classes, history }) => {
  const goToPalette = (id: string) => {
    history.push(`/palette/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette
              key={palette.id}
              {...palette}
              goToPalette={goToPalette}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
