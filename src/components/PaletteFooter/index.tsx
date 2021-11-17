import { FC } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import styles from "../../styles/PaletteFooterStyles";

interface PaletteFooterProps extends WithStyles<typeof styles> {
  paletteName: string;
  emoji: string;
}

const PaletteFooter: FC<PaletteFooterProps> = ({
  paletteName,
  emoji,
  classes,
}) => {
  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
};

export default withStyles(styles)(PaletteFooter);
