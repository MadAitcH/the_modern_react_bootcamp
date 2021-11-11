import { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { Dog } from "../../App";
import DogDetails from "../DogDetails";
import DogList from "../DogList";

interface RoutesContainerProps {
  dogs: Dog[];
}

class RoutesContainer extends Component<RoutesContainerProps> {
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
export default RoutesContainer;
