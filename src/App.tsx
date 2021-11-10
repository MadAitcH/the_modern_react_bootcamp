import "./App.css";

import { Component } from "react";
import whiskey from "./images/whiskey.jpg";
import hazel from "./images/hazel.jpg";
import tubby from "./images/tubby.jpg";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import DogList from "./components/DogList";
import DogDetails from "./components/DogDetails";

export interface Dog {
  name: string;
  age: number;
  src: string;
  facts: string[];
}

interface AppProps {
  dogs: Dog[];
}

class App extends Component<AppProps> {
  static defaultProps = {
    dogs: [
      {
        name: "Whiskey",
        age: 5,
        src: whiskey,
        facts: [
          "Whiskey loves eating popcorn.",
          "Whiskey is a terrible guard dog.",
          "Whiskey wants to cuddle with you!",
        ],
      },
      {
        name: "Hazel",
        age: 3,
        src: hazel,
        facts: [
          "Hazel has soooo much energy!",
          "Hazel is highly intelligent.",
          "Hazel loves people more than dogs.",
        ],
      },
      {
        name: "Tubby",
        age: 4,
        src: tubby,
        facts: [
          "Tubby is not the brightest dog",
          "Tubby does not like walks or exercise.",
          "Tubby loves eating food.",
        ],
      },
    ],
  };

  render() {
    const getDog = (props: RouteComponentProps<{ name: string }>) => {
      const { name } = props.match.params;

      const currentDog = this.props.dogs.find(
        dog => dog.name.toLowerCase() === name.toLowerCase()
      );

      return <DogDetails {...props} dog={currentDog} />;
    };
    return (
      <Switch>
        <Route
          exact
          path="/dogs"
          render={() => <DogList dogs={this.props.dogs} />}
        />

        <Route exact path="/dogs/:name" render={getDog} />
      </Switch>
    );
  }
}

export default App;
