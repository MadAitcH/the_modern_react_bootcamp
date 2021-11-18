import { Component } from "react";
import { withStyles, WithStyles } from "@mui/styles";

const styles: { [key: string]: any } = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
  },
};

interface DraggableColorBoxProps extends WithStyles<typeof styles> {
  color: string;
  name: string;
}

class DraggableColorBox extends Component<DraggableColorBoxProps> {
  render() {
    const { color, name, classes } = this.props;
    return (
      <div className={classes.root} style={{ backgroundColor: color }}>
        {name}
      </div>
    );
  }
}

export default withStyles(styles)(DraggableColorBox);
