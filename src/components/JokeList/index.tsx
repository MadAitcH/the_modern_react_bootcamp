import "./JokeList.css";

import { Component } from "react";
import Joke from "../Joke";

interface IJoke {
  id: string;
  joke: string;
  status: number;
  votes: number;
}

interface JokeListProps {
  jokesToGet: number;
}
interface JokeListState {
  jokes: IJoke[];
}

const JOKE_API = "https://icanhazdadjoke.com/";
const LOCAL_STORAGE_JOKES = "Mustafa's-dad-jokes";

class JokeList extends Component<JokeListProps, JokeListState> {
  static defaultProps = {
    jokesToGet: 5,
  };

  constructor(props: JokeListProps) {
    super(props);

    this.state = {
      jokes: [],
    };

    this.fetchAJoke = this.fetchAJoke.bind(this);
    this.onFetchJokesClick = this.onFetchJokesClick.bind(this);
    this.onVoteClick = this.onVoteClick.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
  }

  async componentDidMount() {
    const jokes = localStorage.getItem(LOCAL_STORAGE_JOKES);

    if (jokes) {
      this.setState({
        jokes: JSON.parse(jokes),
      });
    } else {
      try {
        await this.onFetchJokesClick();
      } catch (err) {
        console.error((err as Error).message);
        return;
      }
    }
  }

  async onFetchJokesClick() {
    const jokes: IJoke[] = [];
    try {
      while (jokes.length < this.props.jokesToGet) {
        const joke = await this.fetchAJoke();
        if (joke) {
          jokes.push(joke);
        }
      }

      this.setState(st => {
        return {
          jokes: [...st.jokes, ...jokes],
        };
      }, this.saveToLocalStorage);
    } catch (err) {
      console.error(err.message);
      return;
    }
  }

  async fetchAJoke(url: string = JOKE_API) {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      const joke: IJoke = await res.json();

      const isUnique = !this.state.jokes.some(j => j.id === joke.id);

      if (isUnique) {
        joke.votes = 0;
        return joke;
      }
    }
  }

  onVoteClick(id: string, type: "upVote" | "downVote") {
    const count = type === "upVote" ? 1 : -1;
    this.setState(st => {
      return {
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + count } : j
        ),
      };
    }, this.saveToLocalStorage);
  }

  saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_JOKES, JSON.stringify(this.state.jokes));
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="laughing emoji"
          />
          <button className="JokeList-getmore" onClick={this.onFetchJokesClick}>
            Fetch Jokes
          </button>
        </div>

        <div className="JokeList-jokes">
          {this.state.jokes.map(j => (
            <Joke
              key={j.id}
              id={j.id}
              votes={j.votes}
              text={j.joke}
              onVote={this.onVoteClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
