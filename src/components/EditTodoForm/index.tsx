import { FC, FormEvent } from "react";
import { TextField } from "@mui/material";
import useInputState from "../../hooks/useInputState";

interface EditTodoFormProps {
  id: string;
  task: string;
  editTodo: (todoId: string, task: string) => void;
  toggleIsEditing: () => void;
}

const EditTodoForm: FC<EditTodoFormProps> = ({
  id,
  editTodo,
  task,
  toggleIsEditing,
}) => {
  const [editText, changeEditText] = useInputState(task);

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
