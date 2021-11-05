import "./RuleRow.css";

import { Component } from "react";

interface RuleRowProps {
  // TODO: fix types
  name: string;
  score: number;
  doScore: () => void;
}

class RuleRow extends Component<RuleRowProps> {
  render() {
    return (
      <tr className="RuleRow RuleRow-active" onClick={this.props.doScore}>
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">{this.props.score}</td>
      </tr>
    );
  }
}

export default RuleRow;

