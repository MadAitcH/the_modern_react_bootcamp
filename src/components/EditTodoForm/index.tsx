import { FC, useContext, FormEvent } from "react";
import { TextField } from "@mui/material";
import useInputState from "../../hooks/useInputState";
import { TodosContext } from "../../contexts/todos.context";

interface EditTodoFormProps {
  id: string;
  task: string;
  toggleIsEditing: () => void;
}

const EditTodoForm: FC<EditTodoFormProps> = ({ id, task, toggleIsEditing }) => {
  const [editText, changeEditText] = useInputState(task);
  const { editTodo } = useContext(TodosContext);

  const onSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editTodo(id, editText);
    toggleIsEditing();
  };

  return (
    <form onSubmit={onSubmitEdit} style={{ marginLeft: "1rem", width: "50%" }}>
      <TextField
        value={editText}
        onChange={changeEditText}
        margin="normal"
        fullWidth
        autoFocus
        variant="standard"
      />
    </form>
  );
};

export default EditTodoForm;
