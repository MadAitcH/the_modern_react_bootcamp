import "./NewTodoForm.css";

import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ITodo } from "../Todo";

interface NewTodoFormProps {
  addNewTodo: (newTodo: ITodo) => void;
}

const NewTodoForm: FC<NewTodoFormProps> = ({ addNewTodo }) => {
  const [task, setTask] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!task) return;

    const newTodo: ITodo = {
      task,
      id: uuidv4(),
      completed: false,
    };

    addNewTodo(newTodo);

    setTask("");
  };

  return (
    <form className="NewTodoForm" onSubmit={onFormSubmit}>
      <label htmlFor="task">New Todo</label>
      <input
        type="text"
        id="task"
        name="task"
        placeholder="New Todo"
        value={task}
        onChange={onInputChange}
      />
      <button className="NewTodoForm__save">Add Todo</button>
    </form>
  );
};

export default NewTodoForm;
