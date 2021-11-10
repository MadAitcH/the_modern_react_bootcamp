import { Component } from "react";
import { Link } from "react-router-dom";

class Soda extends Component {
  render() {
    return (
      <div className="Soda">
        <h1>Soda</h1>
        <button>
          <Link to="/">Go Back</Link>
        </button>
      </div>
    );
  }
}

export default Soda;
