import "./Joke.css";
import { Component, MouseEvent } from "react";

interface JokeProps {
  id: string;
  onVote: (id: string, type: "upVote" | "downVote") => void;
  votes: number;
  text: string;
}

class Joke extends Component<JokeProps> {
  constructor(props: JokeProps) {
    super(props);

    this.getColor = this.getColor.bind(this);
    this.getEmoji = this.getEmoji.bind(this);
    this.onVoteClick = this.onVoteClick.bind(this);
  }

  getColor() {
    if (this.props.votes >= 15) {
      return "#4CAF50";
    } else if (this.props.votes >= 12) {
      return "#8BC34A";
    } else if (this.props.votes >= 9) {
      return "#CDDC39";
    } else if (this.props.votes >= 6) {
      return "#FFEB3B";
    } else if (this.props.votes >= 3) {
      return "#FFC107";
    } else if (this.props.votes >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  }

  getEmoji() {
    if (this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
      return "em em-laughing";
    } else if (this.props.votes >= 9) {
      return "em em-smiley";
    } else if (this.props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  onVoteClick(e: MouseEvent<HTMLElement>) {
    const buttonType = (e.target as HTMLElement).dataset["type"];

    if (buttonType === "upVote" || buttonType === "downVote") {
      this.props.onVote(this.props.id, buttonType);
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i
            className="fas fa-arrow-up"
            data-type="upVote"
            onClick={this.onVoteClick}
          />
          <span className="Joke-votes" style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>
          <i
            className="fas fa-arrow-down"
            data-type="downVote"
            onClick={this.onVoteClick}
          />
        </div>
        <div className="Joke-text">{this.props.text}</div>
        <div className="Joke-smiley">
          <i className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}

export default Joke;
