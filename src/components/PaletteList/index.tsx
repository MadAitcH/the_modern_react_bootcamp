import { Component } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import { IPalette } from "../../utils/seedColors";
import MiniPalette from "../MiniPalette";
import { Link, RouteComponentProps } from "react-router-dom";
import styles from "../../styles/PaletteListStyles";

interface PaletteListProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {
  palettes: IPalette[];
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
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                key={palette.id}
                {...palette}
                goToPalette={this.goToPalette}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
