import "./Die.css";

interface DieProps {
  face: number;
}

const faces: { [key: number]: string } = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
};

const Die: React.FC<DieProps> = ({ face }) => {
  return (
    <div className="Die">
      <i className={`fas fa-dice-${faces[face]}`} />
    </div>
  );
};

export default Die;
