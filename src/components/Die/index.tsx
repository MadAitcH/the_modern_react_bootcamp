import "./Die.css";

import { Component } from "react";

interface DieProps {
  locked: boolean;
  idx: number;
  val: number;
  rolling: boolean;
  disabled: boolean;
  handleClick: (idx: number) => void;
}

const faces: { [key: number]: string } = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};

class Die extends Component<DieProps> {
  constructor(props: DieProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.idx);
  }

  render() {
    const { val, locked, rolling } = this.props;
    return (
      <i
        onClick={this.handleClick}
        data-disabled={locked}
        className={`Die fas fa-dice-${faces[val]} fa-5x ${
          rolling && "Die-rolling"
        } ${locked && "Die-locked"}`}
      />
    );
  }
}

export default Die;
