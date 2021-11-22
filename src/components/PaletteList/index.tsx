import { Component } from "react";
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

class PaletteList extends Component<PaletteListProps> {
  constructor(props: PaletteListProps) {
    super(props);

    this.goToPalette = this.goToPalette.bind(this);
  }

  goToPalette(id: string) {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    const { palettes, classes, deletePalette } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  goToPalette={this.goToPalette}
                  deletePalette={deletePalette}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
