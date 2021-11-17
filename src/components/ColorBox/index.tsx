import "./ColorBox.css";

import { FC, useState, MouseEvent } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles, WithStyles } from "@mui/styles";
import chroma from "chroma-js";
import { Link } from "react-router-dom";

const styles: { [key: string]: any } = {
  ColorBox: {
    width: "20%",
    height: (props: ColorBoxProps) => (props.showFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: 1,
    },
  },
  copyText: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() >= 0.65 ? "black" : "white",
  },
  colorName: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "black",
  },

  seeMore: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() >= 0.65
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    position: "absolute",
    bottom: "0",
    right: "0",
    border: "none",
    background: "rgba(255, 255, 255, 0.3)",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyButton: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() >= 0.65
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    border: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    textDecoration: "none",
    opacity: 0,
  },
};

interface ColorBoxProps extends WithStyles<typeof styles> {
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
          className={`copy-overlay ${copied ? "show" : ""}`}
          style={{ background }}
        />
        <div className={`copy-msg ${copied ? "show" : ""}`}>
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
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
