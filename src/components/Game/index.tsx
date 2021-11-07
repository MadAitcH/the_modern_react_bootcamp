import "./Game.css";

import { FC, useEffect, useState } from "react";
import Dice from "../Dice";
import ScoreTable, { Score } from "../ScoreTable";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

const initialScores = {
  ones: undefined,
  twos: undefined,
  threes: undefined,
  fours: undefined,
  fives: undefined,
  sixes: undefined,
  threeOfKind: undefined,
  fourOfKind: undefined,
  fullHouse: undefined,
  smallStraight: undefined,
  largeStraight: undefined,
  yahtzee: undefined,
  chance: undefined,
};

const initialDice: number[] = Array.from({ length: NUM_DICE });
const initialLocked: boolean[] = Array(NUM_DICE).fill(false);

const Game: FC = () => {
  const [dice, setDice] = useState<number[]>(initialDice);
  const [locked, setLocked] = useState<boolean[]>(initialLocked);
  const [rolling, setRolling] = useState(false);
  const [rollsLeft, setRollsLeft] = useState(NUM_ROLLS);
  const [isOver, setIsOver] = useState(false);
  const [scores, setScores] = useState<{
    [key in Score]: number | undefined;
  }>(initialScores);

  useEffect(() => {
    animateRoll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOver) return;

    for (let k in scores) {
      if (scores[k as Score] === undefined) return;
    }

    setIsOver(true);
    setRollsLeft(0);
  }, [isOver, scores]);

  const animateRoll = () => {
    setRolling(true);

    setTimeout(roll, 1000);
  };

  const roll = () => {
    // roll dice whose indexes are in reroll
    setDice(dice.map((d, i) => (locked[i] ? d : Math.ceil(Math.random() * 6))));
    setLocked(rollsLeft > 1 ? locked : Array(NUM_DICE).fill(true));
    setRollsLeft(rollsLeft >= 1 ? rollsLeft - 1 : 0);
    setRolling(false);
  };

  const onRestartClick = () => {
    setDice(initialDice);
    setLocked(initialLocked);
    setRolling(false);
    setRollsLeft(NUM_ROLLS);
    setIsOver(false);
    setScores(initialScores);

    animateRoll();
  };

  const toggleLocked = (idx: number) => {
    // toggle whether idx is in locked or not
    if (rollsLeft > 0 && !rolling) {
      setLocked([
        ...locked.slice(0, idx),
        !locked[idx],
        ...locked.slice(idx + 1),
      ]);
    }
  };

  const doScore = (rulename: string, ruleFn: (dice: number[]) => number) => {
    // evaluate this ruleFn with the dice and score this rulename
    setScores({ ...scores, [rulename]: ruleFn(dice) });
    setRollsLeft(NUM_ROLLS);
    setLocked(Array(NUM_DICE).fill(false));

    animateRoll();
  };

  const displayRollInfo = () => {
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round",
    ];
    return messages[rollsLeft || 0];
  };

  return (
    <div className="Game">
      <header className="Game-header">
        <h1 className="App-title">Yahtzee!</h1>

        <section className="Game-dice-section">
          <Dice
            disabled={rollsLeft <= 0}
            rolling={rolling}
            dice={dice}
            locked={locked}
            handleClick={toggleLocked}
          />
          <div className="Game-button-wrapper">
            <button
              className="Game-reroll"
              disabled={locked.every(x => x) || rolling || rollsLeft <= 0}
              onClick={animateRoll}
            >
              {displayRollInfo()}
            </button>
          </div>
        </section>
      </header>

      {isOver ? (
        <div className="Game-over">
          <h1>Game Over</h1>
          <button className="Game-restart" onClick={onRestartClick}>
            Restart
          </button>
        </div>
      ) : (
        <ScoreTable doScore={doScore} scores={scores} />
      )}
    </div>
  );
};

export default Game;
