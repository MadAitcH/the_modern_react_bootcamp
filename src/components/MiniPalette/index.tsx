import { PureComponent, MouseEvent } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { IPalette } from "../../utils/seedColors";
import styles from "../../styles/MiniPaletteStyles";

interface MiniPaletteProps extends IPalette, WithStyles<typeof styles> {
  goToPalette: (id: string) => void;
  openDialog: (paletteId: string) => void;
}

class MiniPalette extends PureComponent<MiniPaletteProps> {
  constructor(props: MiniPaletteProps) {
    super(props);

    this.onLinkClick = this.onLinkClick.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  onLinkClick() {
    this.props.goToPalette(this.props.id);
  }

  deletePalette(e: MouseEvent) {
    e.stopPropagation();
    this.props.openDialog(this.props.id);
  }

  render() {
    const { classes, emoji, paletteName, colors } = this.props;
    const miniColorBoxes = colors.map(color => (
      <div
        key={color.name}
        className={classes.miniColor}
        style={{
          backgroundColor: color.color,
        }}
      />
    ));
    return (
      <div className={classes.root} onClick={this.onLinkClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={this.deletePalette}
        />
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
