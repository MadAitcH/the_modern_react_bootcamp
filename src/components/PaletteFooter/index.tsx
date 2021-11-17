import { Component } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import styles from "../../styles/PaletteFooterStyles";

interface PaletteFooterProps extends WithStyles<typeof styles> {
  paletteName: string;
  emoji: string;
}

class PaletteFooter extends Component<PaletteFooterProps> {
  render() {
    const { paletteName, emoji, classes } = this.props;
    return (
      <footer className={classes.PaletteFooter}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </footer>
    );
  }
}

export default withStyles(styles)(PaletteFooter);
