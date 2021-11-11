import "./ColorBox.css";

import { Component } from "react";

interface ColorBoxProps {
  background: string;
  name: string;
}

class ColorBox extends Component<ColorBoxProps> {
  render() {
    return (
      <div className="ColorBox" style={{ background: this.props.background }}>
        <span>{this.props.name}</span>
        <span>MORE</span>
      </div>
    );
  }
}

export default ColorBox;
