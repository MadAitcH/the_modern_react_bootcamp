import "./ScoreTable.css";

import { FC } from "react";
import RuleRow from "../RuleRow";

import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
} from "../../helpers/Rules";

export type Score =
  | "ones"
  | "twos"
  | "threes"
  | "fours"
  | "fives"
  | "sixes"
  | "threeOfKind"
  | "fourOfKind"
  | "fullHouse"
  | "smallStraight"
  | "largeStraight"
  | "yahtzee"
  | "chance";

interface ScoreTableProps {
  scores: { [key in Score]: number | undefined };
  doScore: (rulename: string, ruleFn: (dice: number[]) => number) => void;
}

const ScoreTable: FC<ScoreTableProps> = ({ scores, doScore }) => {
  const getTotalScore = () => {
    let totalScore = 0;
    for (let key in scores) {
      if (scores[key as Score]) totalScore += scores[key as Score] || 0;
    }
    return totalScore;
  };

  return (
    <div className="ScoreTable">
      <section className="ScoreTable-section">
        <h2>Upper</h2>
        <table cellSpacing="0">
          <tbody>
            <RuleRow
              name="Ones"
              score={scores.ones}
              description={ones.description}
              doScore={() => doScore("ones", ones.evalRoll)}
            />
            <RuleRow
              name="Twos"
              score={scores.twos}
              description={twos.description}
              doScore={() => doScore("twos", twos.evalRoll)}
            />
            <RuleRow
              name="Threes"
              score={scores.threes}
              description={threes.description}
              doScore={() => doScore("threes", threes.evalRoll)}
            />
            <RuleRow
              name="Fours"
              score={scores.fours}
              description={fours.description}
              doScore={() => doScore("fours", fours.evalRoll)}
            />
            <RuleRow
              name="Fives"
              score={scores.fives}
              description={fives.description}
              doScore={() => doScore("fives", fives.evalRoll)}
            />
            <RuleRow
              name="Sixes"
              score={scores.sixes}
              description={sixes.description}
              doScore={() => doScore("sixes", sixes.evalRoll)}
            />
          </tbody>
        </table>
      </section>
      <section className="ScoreTable-section ScoreTable-section-lower">
        <h2>Lower</h2>
        <table cellSpacing="0">
          <tbody>
            <RuleRow
              name="Three of Kind"
              score={scores.threeOfKind}
              description={threeOfKind.description}
              doScore={() => doScore("threeOfKind", threeOfKind.evalRoll)}
            />
            <RuleRow
              name="Four of Kind"
              score={scores.fourOfKind}
              description={fourOfKind.description}
              doScore={() => doScore("fourOfKind", fourOfKind.evalRoll)}
            />
            <RuleRow
              name="Full House"
              score={scores.fullHouse}
              description={fullHouse.description}
              doScore={() => doScore("fullHouse", fullHouse.evalRoll)}
            />
            <RuleRow
              name="Small Straight"
              score={scores.smallStraight}
              description={smallStraight.description}
              doScore={() => doScore("smallStraight", smallStraight.evalRoll)}
            />
            <RuleRow
              name="Large Straight"
              score={scores.largeStraight}
              description={largeStraight.description}
              doScore={() => doScore("largeStraight", largeStraight.evalRoll)}
            />
            <RuleRow
              name="Yahtzee"
              score={scores.yahtzee}
              description={yahtzee.description}
              doScore={() => doScore("yahtzee", yahtzee.evalRoll)}
            />
            <RuleRow
              name="Chance"
              score={scores.chance}
              description={chance.description}
              doScore={() => doScore("chance", chance.evalRoll)}
            />
          </tbody>
        </table>
      </section>
      <h2>TOTAL SCORE: {getTotalScore()}</h2>
    </div>
  );
};

export default ScoreTable;
