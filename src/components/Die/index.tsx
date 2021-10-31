import "./Die.css";
import { Component } from "react";

interface DieProps {
  face: number;
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
  render() {
    return (
      <div className="Die">
        <i className={`fas fa-dice-${faces[this.props.face]}`} />
      </div>
    );
  }
}

export default Die;
