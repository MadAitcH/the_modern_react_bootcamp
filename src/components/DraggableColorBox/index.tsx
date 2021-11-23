import { Component } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";
import styles from "../../styles/DraggableColorBoxStyles";

export interface DraggableColorBoxProps extends WithStyles<typeof styles> {
  color: string;
  name: string;
  removeColorBox: (colorName: string) => void;
}

class DraggableColorBox extends Component<DraggableColorBoxProps> {
  constructor(props: DraggableColorBoxProps) {
    super(props);

    this.onRemoveColorBoxClick = this.onRemoveColorBoxClick.bind(this);
  }

  onRemoveColorBoxClick() {
    this.props.removeColorBox(this.props.name);
  }

  render() {
    const { color, name, classes } = this.props;
    return (
      <div className={classes.root} style={{ backgroundColor: color }}>
        <div className={classes.boxContent}>
          <span>{name}</span>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={this.onRemoveColorBoxClick}
          />
        </div>
      </div>
    );
  }
}

export default SortableElement(withStyles(styles)(DraggableColorBox));
