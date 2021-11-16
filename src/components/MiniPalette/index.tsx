import { Component } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import { IPalette } from "../../utils/seedColors";

// TODO: find a better type for styles
const styles: { [key: string]: any } = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px",
  },
};

interface MiniPaletteProps extends IPalette, WithStyles<typeof styles> {
  goToPalette: (id: string) => void;
}

class MiniPalette extends Component<MiniPaletteProps> {
  constructor(props: MiniPaletteProps) {
    super(props);

    this.onLinkClick = this.onLinkClick.bind(this);
  }

  onLinkClick() {
    this.props.goToPalette(this.props.id);
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
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
