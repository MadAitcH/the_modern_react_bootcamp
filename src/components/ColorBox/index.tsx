import "./ColorBox.css";

import { Component } from "react";

interface ColorBoxProps {
  /** Array of colors for background of ColorBox */
  palette: string[];
}

interface ColorBoxState {
  bg: string;
}

class ColorBox extends Component<ColorBoxProps, ColorBoxState> {
  static defaultProps = {
    palette: [
      "red",
      "yellow",
      "#137174",
      "rgb(00,00,09)",
      "rgba(255, 93, 38, 200)",
      "gold",
      "whitesmoke",
    ],
  };

  constructor(props: ColorBoxProps) {
    super(props);

    this.state = {
      bg: this.randomPick(this.props.palette),
    };

    this.randomPick = this.randomPick.bind(this);
    this.onBoxClick = this.onBoxClick.bind(this);
  }

  randomPick(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  onBoxClick() {
    let newBg;
    do {
      newBg = this.randomPick(this.props.palette);
    } while (newBg === this.state.bg);

    this.setState({
      bg: newBg,
    });
  }

  render() {
    return (
      <div
        className="ColorBox"
        onClick={this.onBoxClick}
        style={{ backgroundColor: this.state.bg }}
      />
    );
  }
}

export default ColorBox;
