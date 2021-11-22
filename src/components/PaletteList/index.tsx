import { FC } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import { Link, RouteComponentProps } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { IPalette } from "../../utils/seedColors";
import MiniPalette from "../MiniPalette";
import styles from "../../styles/PaletteListStyles";

interface PaletteListProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {
  palettes: IPalette[];
  deletePalette: (paletteId: string) => void;
}

const PaletteList: FC<PaletteListProps> = ({
  palettes,
  classes,
  history,
  deletePalette,
}) => {
  const goToPalette = (id: string) => {
    history.push(`/palette/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map(palette => (
            <CSSTransition timeout={500} key={palette.id} classNames="fade">
              <MiniPalette
                {...palette}
                goToPalette={goToPalette}
                deletePalette={deletePalette}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
