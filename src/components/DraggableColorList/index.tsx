import { FC } from "react";
import { SortableContainer, SortEndHandler } from "react-sortable-hoc";
import { NewColor } from "../../utils/seedColors";
import DraggableColorBox from "../DraggableColorBox";

interface DraggableColorListProps {
  colors: NewColor[];
  removeColorBox: (colorName: string) => void;
  axis: "x" | "y" | "xy";
  onSortEnd: SortEndHandler;
}

const DraggableColorList: FC<DraggableColorListProps> = ({
  colors,
  removeColorBox,
}) => {
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
};

export default SortableContainer(DraggableColorList);
