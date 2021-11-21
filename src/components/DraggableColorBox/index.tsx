import { FC } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";
import styles from "../../styles/DraggableColorBoxStyles";

interface DraggableColorBoxProps extends WithStyles<typeof styles> {
  color: string;
  name: string;
  removeColorBox: (colorName: string) => void;
}

const DraggableColorBox: FC<DraggableColorBoxProps> = ({
  color,
  classes,
  name,
  removeColorBox,
}) => {
  const onRemoveColorBoxClick = () => {
    removeColorBox(name);
  };

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={onRemoveColorBoxClick}
        />
      </div>
    </div>
  );
};

export default SortableElement(withStyles(styles)(DraggableColorBox));
