import { Component } from "react";
import { SortableContainer, SortEndHandler } from "react-sortable-hoc";
import { withStyles, WithStyles } from "@mui/styles";
import { NewColor } from "../../utils/seedColors";
import DraggableColorBox from "../DraggableColorBox";
import styles from "../../styles/DraggableColorListStyles";

interface DraggableColorListProps extends WithStyles<typeof styles> {
  colors: NewColor[];
  removeColorBox: (colorName: string) => void;
  axis: "x" | "y" | "xy";
  onSortEnd: SortEndHandler;
}

class DraggableColorList extends Component<DraggableColorListProps> {
  render() {
    const { colors, removeColorBox, classes } = this.props;
    return (
      <div className={classes.root}>
        {colors.map((color, i) => (
          <DraggableColorBox
            {...color}
            key={color.name}
            index={i}
            removeColorBox={removeColorBox}
          />
        ))}
      </div>
    );
  }
}

export default SortableContainer(withStyles(styles)(DraggableColorList));
