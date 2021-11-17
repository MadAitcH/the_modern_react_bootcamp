import { Component, MouseEvent } from "react";
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

interface ColorBoxState {
  copied: boolean;
}

class ColorBox extends Component<ColorBoxProps, ColorBoxState> {
  constructor(props: ColorBoxProps) {
    super(props);

    this.state = {
      copied: false,
    };

    this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
  }

  onCopyToClipboard() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }

  render() {
    const { classes, name, background, moreUrl, showFullPalette } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.onCopyToClipboard}>
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
  }
}

export default withStyles(styles)(ColorBox);
