import { Link } from "react-router-dom";

function Soda() {
  return (
    <div className="Soda">
      <h1>Soda</h1>
      <button>
        <Link to="/">Go Back</Link>
      </button>
    </div>
  );
}

export default Soda;
