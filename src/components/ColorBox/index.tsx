import "./ColorBox.css";

import { Component, MouseEvent } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import { Link } from "react-router-dom";

interface ColorBoxProps {
  background: string;
  name: string;
  moreUrl?: string;
  showLink?: boolean;
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
    const { name, background, moreUrl, showLink } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.65;

    return (
      <CopyToClipboard text={background} onCopy={this.onCopyToClipboard}>
        <div className="ColorBox" style={{ background }}>
          <div
            className={`copy-overlay ${copied ? "show" : ""}`}
            style={{ background }}
          />
          <div className={`copy-msg ${copied ? "show" : ""}`}>
            <h1>copied!</h1>
            <p className={`${isLightColor ? "dark-text" : ""}`}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor ? "light-text" : ""}>{name}</span>
            </div>
            <button
              className={`copy-button ${isLightColor ? "dark-text" : ""}`}
            >
              Copy
            </button>
          </div>
          {showLink && moreUrl && (
            <Link to={moreUrl} onClick={(e: MouseEvent) => e.stopPropagation()}>
              <span className={`see-more ${isLightColor ? "dark-text" : ""}`}>
                More
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
