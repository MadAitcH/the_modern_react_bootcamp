import "./Hangman.css";

import { Component, MouseEvent } from "react";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";
import { checkGuess } from "../../utils";

interface HangmanProps {
  maxWrong: number;
  images: string[];
}

interface HangmanState {
  nWrong: number;
  guessed: Set<string>;
  answer: string;
}

class Hangman extends Component<HangmanProps, HangmanState> {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps: HangmanProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props: HangmanProps) {
    super(props);

    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };

    this.handleGuess = this.handleGuess.bind(this);
    this.onRestartClick = this.onRestartClick.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(e: MouseEvent<HTMLButtonElement>) {
    let ltr = (e.target as HTMLButtonElement).value;

    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  onRestartClick() {
    this.setState({
      answer: randomWord(),
      nWrong: 0,
      guessed: new Set(),
    });
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong}/${this.props.maxWrong} wrong guesses`}
        />
        <p className="Hangman-wrong">Wrong Guesses: {this.state.nWrong}</p>
        <p className="Hangman-word">
          {this.state.nWrong < this.props.maxWrong
            ? this.guessedWord()
            : this.state.answer}
        </p>

        {checkGuess(this.state.guessed, this.state.answer) ? (
          <div>
            <h2>You Won!</h2>
            <button onClick={this.onRestartClick} className="Hangman-restart">
              Restart!
            </button>
          </div>
        ) : this.state.nWrong < this.props.maxWrong ? (
          <p className="Hangman-btns">{this.generateButtons()}</p>
        ) : (
          <div>
            <h2>Game Over</h2>
            <button onClick={this.onRestartClick} className="Hangman-restart">
              Restart!
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Hangman;
