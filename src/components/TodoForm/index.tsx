import { FC, useContext, MouseEvent } from "react";
import { Paper, TextField } from "@mui/material";
import useInputState from "../../hooks/useInputState";
import { TodosContext } from "../../contexts/todos.context";

const TodoForm: FC = () => {
  const [text, changeText, resetText] = useInputState("");
  const { dispatchTodos } = useContext(TodosContext);

  const onSubmitTodo = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatchTodos({ type: "ADD", payload: { task: text } });
    resetText();
  };

  return (
    <Paper style={{ margin: "1rem 0", padding: "0 1rem" }}>
      <form onSubmit={onSubmitTodo}>
        <TextField
          value={text}
          onChange={changeText}
          margin="normal"
          label="Add New Todo"
          fullWidth
          autoFocus
          variant="standard"
        />
      </form>
    </Paper>
  );
};

export default TodoForm;
