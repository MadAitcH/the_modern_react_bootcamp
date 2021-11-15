import { WithStyles, withStyles } from "@mui/styles";
import { Component } from "react";

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

class MiniPalette extends Component<MiniPaletteProps> {
  render() {
    return (
      <div className={this.props.classes.main}>
        <h1 className={this.props.classes.secondary}>MiniPalette</h1>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
