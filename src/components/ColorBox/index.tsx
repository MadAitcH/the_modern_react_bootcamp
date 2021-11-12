import "./ColorBox.css";

import { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ColorBoxProps {
  background: string;
  name: string;
}

class ColorBox extends Component<ColorBoxProps> {
  render() {
    const { name, background } = this.props;
    return (
      <CopyToClipboard text={background}>
        <div className="ColorBox" style={{ background }}>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <span className="see-more">More</span>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
