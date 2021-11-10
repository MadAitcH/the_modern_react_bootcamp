import { Link } from "react-router-dom";

function Chips() {
  return (
    <div className="Chips">
      <h1>Chips</h1>
      <button>
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
}

export default Chips;
