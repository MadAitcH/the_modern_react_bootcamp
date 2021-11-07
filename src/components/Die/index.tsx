import "./Die.css";

import { Component } from "react";

interface DieProps {
  locked: boolean;
  idx: number;
  val: number;
  handleClick: (idx: number) => void;
}

interface DieState {
  isRolling: boolean;
}

const faces: { [key: number]: string } = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};

class Die extends Component<DieProps, DieState> {
  constructor(props: DieProps) {
    super(props);

    this.state = {
      isRolling: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.isRolling) return;

    this.setState({
      isRolling: true,
    });

    this.props.handleClick(this.props.idx);

    setTimeout(() => {
      this.setState({ isRolling: false });
    }, 1000);
  }

  render() {
    return (
      <button
        className={`Die ${
          this.state.isRolling && !this.props.locked && "Die-rolling"
        } ${this.props.locked && "Die-locked"}`}
        style={{ backgroundColor: this.props.locked ? "grey" : "black" }}
        onClick={this.handleClick}
        disabled={this.props.locked}
      >
        <i className={`fas fa-dice-${faces[this.props.val]}`} />
      </button>
    );
  }
}

export default Die;
