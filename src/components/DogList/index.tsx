import "./DogList.css";

import { Component } from "react";
import { Dog } from "../../App";

interface DogListProps {
  dogs: Dog[];
}

class DogList extends Component<DogListProps> {
  render() {
    return (
      <div className="DogList">
        <h1 className="dispaly-1 text-center">Dog List!</h1>
        <div className="container">
          <div className="row">
            {this.props.dogs.map(d => (
              <div className="Dog col-md-6 col-lg-4 text-center" key={d.name}>
                <img src={d.src} alt={d.name} />
                <h3>{d.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DogList;
