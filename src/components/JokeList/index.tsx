import "./JokeList.css";

import { FC, useEffect, useState } from "react";
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

const JOKE_API = "https://icanhazdadjoke.com/";
const LOCAL_STORAGE_JOKES = "Mustafa's-dad-jokes";

const JokeList: FC<JokeListProps> = ({ jokesToGet = 5 }) => {
  const [jokes, setJokes] = useState<IJoke[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function asyncFetchJokes() {
      const localJokes = localStorage.getItem(LOCAL_STORAGE_JOKES);

      if (localJokes) {
        setJokes(JSON.parse(localJokes));
        setLoading(false);
      } else {
        try {
          await onFetchJokesClick();
        } catch (err) {
          console.error((err as Error).message);
          setLoading(false);
          return;
        }
      }
    }

    asyncFetchJokes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onFetchJokesClick() {
    setLoading(true);
    getJokes();
  }

  async function fetchAJoke(url: string = JOKE_API) {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      const joke: IJoke = await res.json();

      const isUnique = !jokes.some(j => j.id === joke.id);

      if (isUnique) {
        joke.votes = 0;
        return joke;
      }
    }
  }

  // TODO: maybe we could change getJokes to a generator function.
  async function getJokes() {
    const fetchedJokes: IJoke[] = [];
    try {
      while (fetchedJokes.length < jokesToGet) {
        const joke = await fetchAJoke();
        if (joke) {
          fetchedJokes.push(joke);
        }
      }

      const sortedJokes = [...jokes, ...fetchedJokes].sort(
        (f, s) => s.votes - f.votes
      );

      setLoading(false);
      setJokes(sortedJokes);
      saveToLocalStorage(sortedJokes);
    } catch (err) {
      // if there's an error then ignore fetched jokes and return
      console.error(err.message);
      setLoading(false);
      return;
    }
  }

  const onVoteClick = (id: string, type: "upVote" | "downVote") => {
    const count = type === "upVote" ? 1 : -1;
    const sortedJokes = jokes
      .map(j => (j.id === id ? { ...j, votes: j.votes + count } : j))
      .sort((f, s) => s.votes - f.votes);
    setJokes(sortedJokes);
    saveToLocalStorage(sortedJokes);
  };

  function saveToLocalStorage(jokes: IJoke[]) {
    localStorage.setItem(LOCAL_STORAGE_JOKES, JSON.stringify(jokes));
  }

  return loading ? (
    <div className="JokeList-spinner">
      <i className="far fa-8x fa-laugh fa-spin" />
      <h1 className="JokeList-title">Loading...</h1>
    </div>
  ) : (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Dad</span> Jokes
        </h1>
        <img
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          alt="laughing emoji"
        />
        <button className="JokeList-getmore" onClick={onFetchJokesClick}>
          Fetch Jokes
        </button>
      </div>

      <div className="JokeList-jokes">
        {jokes.map(j => (
          <Joke
            key={j.id}
            id={j.id}
            votes={j.votes}
            text={j.joke}
            onVote={onVoteClick}
          />
        ))}
      </div>
    </div>
  );
};

export default JokeList;
