import "./Game.css";

import { Component } from "react";
import Dice from "../Dice";
import ScoreTable, { Score } from "../ScoreTable";

interface GameState {
  dice: number[];
  locked: boolean[];
  rollsLeft: number;
  rolling: boolean;
  isOver: boolean;
  scores: {
    [key in Score]: number | undefined;
  };
}

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component<any, GameState> {
  constructor(props: any) {
    super(props);

    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rolling: false,
      rollsLeft: NUM_ROLLS,
      isOver: false,
      scores: {
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
      },
    };

    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.animateRoll = this.animateRoll.bind(this);
    this.displayRollInfo = this.displayRollInfo.bind(this);
    this.onRestartClick = this.onRestartClick.bind(this);
  }

  componentDidMount() {
    this.animateRoll();
  }

  componentDidUpdate() {
    if (this.state.isOver) return;

    for (let k in this.state.scores) {
      if (this.state.scores[k as Score] === undefined) return;
    }

    this.setState({ isOver: true, rollsLeft: 0 });
  }

  onRestartClick() {
    this.setState(
      {
        dice: Array.from({ length: NUM_DICE }),
        locked: Array(NUM_DICE).fill(false),
        rolling: false,
        rollsLeft: NUM_ROLLS,
        isOver: false,
        scores: {
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
        },
      },
      () => this.animateRoll()
    );
  }

  roll() {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false,
    }));
  }

  animateRoll() {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  }

  toggleLocked(idx: number) {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0 && !this.state.rolling) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1),
        ],
      }));
    }
  }

  doScore(rulename: string, ruleFn: (dice: number[]) => number) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    this.animateRoll();
  }

  displayRollInfo() {
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round",
    ];
    return messages[this.state.rollsLeft];
  }

  render() {
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>

          <section className="Game-dice-section">
            <Dice
              disabled={this.state.rollsLeft <= 0}
              rolling={this.state.rolling}
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={
                  this.state.locked.every(x => x) ||
                  this.state.rolling ||
                  this.state.rollsLeft <= 0
                }
                onClick={this.animateRoll}
              >
                {this.displayRollInfo()}
              </button>
            </div>
          </section>
        </header>

        {this.state.isOver ? (
          <div className="Game-over">
            <h1>Game Over</h1>
            <button className="Game-restart" onClick={this.onRestartClick}>
              Restart
            </button>
          </div>
        ) : (
          <ScoreTable doScore={this.doScore} scores={this.state.scores} />
        )}
      </div>
    );
  }
}

export default Game;
