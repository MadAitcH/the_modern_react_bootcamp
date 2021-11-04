import "./Todo.css";

import { ChangeEvent, FC, useState } from "react";

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

const Todo: FC<TodoProps> = ({
  task,
  id,
  completed,
  removeTodo,
  editTodo,
  completeTodo,
}) => {
  const [text, setText] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  const onRemoveClick = () => {
    removeTodo(id);
  };

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSaveClick = () => {
    setIsEditing(false);
    editTodo(id, text);
  };

  const onTodoClick = () => {
    completeTodo(id);
  };

  const result = isEditing ? (
    <div className="Todo-edit-form">
      <input
        type="text"
        value={text}
        name="text"
        onChange={onInputChange}
        className="Todo__edit--input"
      />
      <button className="Todo__edit--save" onClick={onSaveClick}>
        Save
      </button>
    </div>
  ) : (
    <div className="task-text">
      <li className={`Todo-task`} onClick={onTodoClick}>
        {task}
      </li>
    </div>
  );

  return (
    <div className={`Todo ${completed && "completed"}`}>
      {result}

      {!isEditing && (
        <div className="Todo-buttons">
          <button
            title="Edit task"
            className="Todo__edit--button"
            onClick={onEditClick}
          >
            &#9998;
          </button>
          <button
            title="Remove task"
            className="Todo__remove"
            onClick={onRemoveClick}
          >
            &#10007;
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
