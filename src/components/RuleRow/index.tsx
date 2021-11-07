import "./RuleRow.css";

import { Component } from "react";

interface RuleRowProps {
  name: string;
  score: number | undefined;
  doScore: () => void;
  description: string;
}

class RuleRow extends Component<RuleRowProps> {
  constructor(props: RuleRowProps) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick() {
    if (this.props.score !== undefined) return;
    this.props.doScore();
  }

  render() {
    const disabled = this.props.score !== undefined;
    return (
      <tr
        className={`RuleRow RuleRow-${disabled ? "disabled" : "active"}`}
        onClick={this.onRowClick}
      >
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">
          {disabled ? this.props.score : this.props.description}
        </td>
      </tr>
    );
  }
}

export default RuleRow;
