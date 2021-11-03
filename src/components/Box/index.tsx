import "./Box.css";

import { Component } from "react";

interface BoxProps {
  width: number;
  height: number;
  bgColor: string;
  id: string;
  removeBox(id: string): void;
}

class Box extends Component<BoxProps> {
  constructor(props: BoxProps) {
    super(props);

    this.onBoxRemoveClick = this.onBoxRemoveClick.bind(this);
  }

  onBoxRemoveClick() {
    this.props.removeBox(this.props.id);
  }

  render() {
    return (
      <div
        className="Box"
        style={{
          backgroundColor: this.props.bgColor,
          width: this.props.width,
          height: this.props.height,
        }}
      >
        <button className="Box__remove" onClick={this.onBoxRemoveClick}>
          X
        </button>
      </div>
    );
  }
}

export default Box;
