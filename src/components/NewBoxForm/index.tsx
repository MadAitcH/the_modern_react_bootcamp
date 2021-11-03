import "./NewBoxForm.css";

import { ChangeEvent, Component, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface Box {
  width: string;
  height: string;
  backgroundColor: string;
  id: string;
}

interface NewBoxProps {
  addBox(newBox: Box): void;
}

interface NewBoxFormState {
  width: string;
  height: string;
  backgroundColor: string;
}

class NewBoxForm extends Component<NewBoxProps, NewBoxFormState> {
  constructor(props: NewBoxProps) {
    super(props);
    this.state = {
      width: "",
      height: "",
      backgroundColor: "",
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      [e.target.name]: e.target.value,
    } as Pick<NewBoxFormState, keyof NewBoxFormState>);
  }

  onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!this.state.width || !this.state.height || !this.state.backgroundColor)
      return;

    const newBox: Box = {
      width: this.state.width,
      height: this.state.height,
      backgroundColor: this.state.backgroundColor,
      id: uuidv4(),
    };

    this.props.addBox(newBox);

    this.setState({
      width: "",
      height: "",
      backgroundColor: "",
    });
  }

  render() {
    return (
      <form className="NewBoxForm" onSubmit={this.onFormSubmit}>
        <div>
          <label htmlFor="width">Width</label>
          <input
            type="text"
            placeholder="100px"
            autoComplete="off"
            min="1"
            id="width"
            name="width"
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input
            type="text"
            placeholder="100px"
            autoComplete="off"
            min="1"
            id="height"
            name="height"
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="backgroundColor">Background Color</label>
          <input
            type="text"
            autoComplete="off"
            placeholder="blue"
            id="backgroundColor"
            name="backgroundColor"
            onChange={this.onInputChange}
          />
        </div>
        <button className="NewBoxForm__submit" type="submit">
          Add a new Box
        </button>
      </form>
    );
  }
}

export default NewBoxForm;
