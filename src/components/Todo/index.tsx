import "./Todo.css";

import { ChangeEvent, Component } from "react";

export interface ITodo {
  task: string;
  id: string;
  completed: boolean;
}

//interface TodoProps  extends ITodo;
type TodoProps = ITodo & {
  removeTodo: (id: string) => void;
  editTodo: (id: string, task: string) => void;
  completeTodo: (id: string) => void;
};

interface TodoState {
  task: string;
  isEditing: boolean;
}

class Todo extends Component<TodoProps, TodoState> {
  constructor(props: TodoProps) {
    super(props);

    this.state = {
      task: this.props.task,
      isEditing: false,
    };

    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onTodoClick = this.onTodoClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onRemoveClick() {
    this.props.removeTodo(this.props.id);
  }

  onEditClick() {
    this.setState({ isEditing: true });
  }

  onInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      task: e.target.value,
    });
  }

  onSaveClick() {
    this.setState({ isEditing: false });

    this.props.editTodo(this.props.id, this.state.task);
  }

  onTodoClick() {
    this.props.completeTodo(this.props.id);
  }

  render() {
    return (
      <div className="Todo">
        {this.state.isEditing ? (
          <div className="Todo__edit">
            <input
              type="text"
              value={this.state.task}
              name="task"
              onChange={this.onInputChange}
              className="Todo__edit--input"
            />
            <button className="Todo__edit--save" onClick={this.onSaveClick}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <li
              className={`Todo__text ${
                this.props.completed && "Todo__striked"
              }`}
              onClick={this.onTodoClick}
            >
              {this.props.task}
            </li>
            <button className="Todo__remove" onClick={this.onRemoveClick}>
              &#128465;
            </button>
            <button className="Todo__edit--button" onClick={this.onEditClick}>
              &#128393;
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Todo;
