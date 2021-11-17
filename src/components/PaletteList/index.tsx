import { FC } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import { IPalette } from "../../utils/seedColors";
import MiniPalette from "../MiniPalette";
import { RouteComponentProps } from "react-router-dom";
import styles from "../../styles/PaletteListStyles";

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
