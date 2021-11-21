import { Component } from "react";
import { SortableContainer, SortEndHandler } from "react-sortable-hoc";
import { NewColor } from "../../utils/seedColors";
import DraggableColorBox from "../DraggableColorBox";

interface DraggableColorListProps {
  colors: NewColor[];
  removeColorBox: (colorName: string) => void;
  axis: "x" | "y" | "xy";
  onSortEnd: SortEndHandler;
}

class DraggableColorList extends Component<DraggableColorListProps> {
  render() {
    const { colors, removeColorBox } = this.props;
    return (
      <div style={{ height: "100%" }}>
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

export default SortableContainer(DraggableColorList);
