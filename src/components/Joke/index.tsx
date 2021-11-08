import "./Joke.css";
import { FC, MouseEvent } from "react";

interface JokeProps {
  id: string;
  onVote: (id: string, type: "upVote" | "downVote") => void;
  votes: number;
  text: string;
}

const Joke: FC<JokeProps> = ({ id, onVote, votes, text }) => {
  const getColor = () => {
    if (votes >= 15) {
      return "#4CAF50";
    } else if (votes >= 12) {
      return "#8BC34A";
    } else if (votes >= 9) {
      return "#CDDC39";
    } else if (votes >= 6) {
      return "#FFEB3B";
    } else if (votes >= 3) {
      return "#FFC107";
    } else if (votes >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  };

  const getEmoji = () => {
    if (votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 12) {
      return "em em-laughing";
    } else if (votes >= 9) {
      return "em em-smiley";
    } else if (votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 3) {
      return "em em-neutral_face";
    } else if (votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  };

  const onVoteClick = (e: MouseEvent<HTMLElement>) => {
    const buttonType = (e.target as HTMLElement).dataset["type"];

    if (buttonType === "upVote" || buttonType === "downVote") {
      onVote(id, buttonType);
    } else {
      return;
    }
  };

  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i
          className="fas fa-arrow-up"
          data-type="upVote"
          onClick={onVoteClick}
        />
        <span className="Joke-votes" style={{ borderColor: getColor() }}>
          {votes}
        </span>
        <i
          className="fas fa-arrow-down"
          data-type="downVote"
          onClick={onVoteClick}
        />
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-smiley">
        <i className={getEmoji()} />
      </div>
    </div>
  );
};

export default Joke;
