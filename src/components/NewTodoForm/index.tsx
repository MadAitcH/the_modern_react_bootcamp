import "./NewTodoForm.css";

import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, Component, FormEvent } from "react";
import { ITodo } from "../Todo";

interface NewTodoFormProps {
  addNewTodo: (newTodo: ITodo) => void;
}

interface NewTodoFormState {
  task: string;
}

class NewTodoForm extends Component<NewTodoFormProps, NewTodoFormState> {
  constructor(props: NewTodoFormProps) {
    super(props);

    this.state = { task: "" };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ task: e.target.value });
  }

  onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!this.state.task) return;

    const newTodo: ITodo = {
      task: this.state.task,
      id: uuidv4(),
      completed: false,
    };

    this.props.addNewTodo(newTodo);

    this.setState({ task: "" });
  }

  render() {
    return (
      <form className="NewTodoForm" onSubmit={this.onFormSubmit}>
        <label htmlFor="task">New Todo</label>
        <input
          type="text"
          id="task"
          name="task"
          placeholder="New Todo"
          value={this.state.task}
          onChange={this.onInputChange}
        />
        <button className="NewTodoForm__save">Add Todo</button>
      </form>
    );
  }
}

export default NewTodoForm;
