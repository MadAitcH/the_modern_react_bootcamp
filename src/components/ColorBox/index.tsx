import "./ColorBox.css";

import { Component } from "react";

interface ColorBoxProps {
  background: string;
  name: string;
}

class ColorBox extends Component<ColorBoxProps> {
  render() {
    const { name, background } = this.props;
    return (
      <div className="ColorBox" style={{ background }}>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <span className="see-more">More</span>
      </div>
    );
  }
}

export default ColorBox;
