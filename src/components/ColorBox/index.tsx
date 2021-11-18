import { FC, useState, MouseEvent } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles, WithStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import styles from "../../styles/ColorBoxStyles";

export interface ColorBoxProps extends WithStyles<typeof styles> {
  background: string;
  name: string;
  moreUrl?: string;
  showFullPalette?: boolean;
}

const ColorBox: FC<ColorBoxProps> = ({
  classes,
  name,
  background,
  moreUrl,
  showFullPalette,
}) => {
  const [copied, setCopied] = useState(false);

  const onCopyToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={background} onCopy={onCopyToClipboard}>
      <div className={classes.ColorBox} style={{ background }}>
        <div
          className={`${classes.copyOverlay} ${
            copied ? classes.showOverlay : ""
          }`}
          style={{ background }}
        />
        <div
          className={`${classes.copyMessage} ${
            copied ? classes.showMessage : ""
          }`}
        >
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showFullPalette && moreUrl && (
          <Link to={moreUrl} onClick={(e: MouseEvent) => e.stopPropagation()}>
            <span className={classes.seeMore}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default withStyles(styles)(ColorBox);
