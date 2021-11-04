import "./Box.css";

import { FC } from "react";

interface BoxProps {
  width: string;
  height: string;
  bgColor: string;
  id: string;
  removeBox(id: string): void;
}

const Box: FC<BoxProps> = ({ width, height, bgColor, id, removeBox }) => {
  const onBoxRemoveClick = () => {
    removeBox(id);
  };

  return (
    <div
      className="Box"
      style={{
        backgroundColor: bgColor,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <button className="Box__remove" onClick={onBoxRemoveClick}>
        X
      </button>
    </div>
  );
};

export default Box;
