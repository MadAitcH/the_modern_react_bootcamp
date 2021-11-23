import { FC, memo, MouseEvent } from "react";
import { WithStyles, withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { IPalette } from "../../utils/seedColors";
import styles from "../../styles/MiniPaletteStyles";

interface MiniPaletteProps extends IPalette, WithStyles<typeof styles> {
  goToPalette: (id: string) => void;
  openDialog: (paletteId: string) => void;
}

const MiniPalette: FC<MiniPaletteProps> = ({
  classes,
  paletteName,
  emoji,
  colors,
  goToPalette,
  openDialog,
  id,
}) => {
  const onLinkClick = () => {
    goToPalette(id);
  };

  const miniColorBoxes = colors.map(color => (
    <div
      key={color.name}
      className={classes.miniColor}
      style={{
        backgroundColor: color.color,
      }}
    />
  ));

  const removePalette = (e: MouseEvent) => {
    e.stopPropagation();
    openDialog(id);
  };

  console.log(paletteName);

  return (
    <div className={classes.root} onClick={onLinkClick}>
      <div className={classes.delete}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={removePalette}
        />
      </div>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default memo(withStyles(styles)(MiniPalette), () => {
  // NOTE: true means never re-render without checking the prevProps and
  // nextProps so if you want to re-render programmatically
  // you may need to change this.
  return true;
});
