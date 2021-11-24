import { FC, MouseEvent } from "react";
import { Paper, TextField } from "@mui/material";
import useInputState from "../../hooks/useInputState";

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm: FC<TodoFormProps> = ({ addTodo }) => {
  const [text, changeText, resetText] = useInputState("");

  const onSubmitTodo = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo(text);
    resetText();
  };

  return (
    <Paper>
      <form onSubmit={onSubmitTodo}>
        <TextField value={text} onChange={changeText} />
      </form>
    </Paper>
  );
};

export default TodoForm;
