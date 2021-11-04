import "./NewBoxForm.css";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Box {
  width: string;
  height: string;
  backgroundColor: string;
  id: string;
}

interface NewBoxProps {
  addBox(newBox: Box): void;
}

const NewBoxForm: FC<NewBoxProps> = ({ addBox }) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "width":
        setWidth(e.target.value);
        break;
      case "height":
        setHeight(e.target.value);
        break;
      case "backgroundColor":
        setBackgroundColor(e.target.value);
        break;
      default:
        return;
    }
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!width || !height || !backgroundColor) return;

    const newBox: Box = {
      width: width,
      height: height,
      backgroundColor: backgroundColor,
      id: uuidv4(),
    };

    addBox(newBox);
    setWidth("");
    setHeight("");
    setBackgroundColor("");
  };

  return (
    <form className="NewBoxForm" onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="width">Width</label>
        <input
          type="number"
          value={width}
          placeholder="100"
          required
          autoComplete="off"
          min="1"
          id="width"
          name="width"
          onChange={onInputChange}
        />
      </div>
      <div>
        <label htmlFor="height">Height</label>
        <input
          type="number"
          value={height}
          placeholder="100"
          required
          autoComplete="off"
          min="1"
          id="height"
          name="height"
          onChange={onInputChange}
        />
      </div>
      <div>
        <label htmlFor="backgroundColor">Background Color</label>
        <input
          type="text"
          value={backgroundColor}
          autoComplete="off"
          required
          placeholder="blue"
          id="backgroundColor"
          name="backgroundColor"
          onChange={onInputChange}
        />
      </div>
      <button className="NewBoxForm__submit" type="submit">
        Add a new Box
      </button>
    </form>
  );
};

export default NewBoxForm;
