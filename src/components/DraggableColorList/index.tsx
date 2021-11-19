import { Component } from "react";
import { SortableContainer } from "react-sortable-hoc";
import { NewColor } from "../../utils/seedColors";
import DraggableColorBox from "../DraggableColorBox";

interface DraggableColorListProps {
  colors: NewColor[];
  removeColorBox: (colorName: string) => void;
  axis: "x" | "y" | "xy";
  onSortEnd: ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => void;
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
            removeColorBox={() => removeColorBox(color.name)}
          />
        ))}
      </div>
    );
  }
}

export default SortableContainer(DraggableColorList);
