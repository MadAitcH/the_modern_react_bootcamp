import "./RuleRow.css";

import { FC } from "react";

interface RuleRowProps {
  name: string;
  score: number | undefined;
  doScore: () => void;
  description: string;
}

const RuleRow: FC<RuleRowProps> = ({ name, score, doScore, description }) => {
  const onRowClick = () => {
    if (score !== undefined) return;
    doScore();
  };

  const disabled = score !== undefined;

  return (
    <tr
      className={`RuleRow RuleRow-${disabled ? "disabled" : "active"}`}
      onClick={onRowClick}
    >
      <td className="RuleRow-name">{name}</td>
      <td className="RuleRow-score">{disabled ? score : description}</td>
    </tr>
  );
};

export default RuleRow;
