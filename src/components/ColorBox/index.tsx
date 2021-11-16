import "./ColorBox.css";

import { Component, MouseEvent } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

interface ColorBoxProps {
  background: string;
  name: string;
  moreUrl: string;
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
    const { name, background, moreUrl } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.onCopyToClipboard}>
        <div className="ColorBox" style={{ background }}>
          <div
            className={`copy-overlay ${copied ? "show" : ""}`}
            style={{ background }}
          />
          <div className={`copy-msg ${copied ? "show" : ""}`}>
            <h1>copied!</h1>
            <p>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <Link to={moreUrl} onClick={(e: MouseEvent) => e.stopPropagation()}>
            <span className="see-more">More</span>
          </Link>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
