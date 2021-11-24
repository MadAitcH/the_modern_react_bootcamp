import { FC } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export interface ITodo {
  id: string;
  task: string;
  completed: boolean;
}

interface TodoItemProps extends ITodo {
  removeTodo: (todoId: string) => void;
  toggleCompletion: (todoId: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  task,
  id,
  completed,
  removeTodo,
  toggleCompletion,
}) => {
  const deleteTodo = () => {
    removeTodo(id);
  };

  const changeCompletion = () => {
    toggleCompletion(id);
  };

  return (
    <ListItem>
      <Checkbox tabIndex={-1} checked={completed} onClick={changeCompletion} />
      <ListItemText
        style={{ textDecoration: completed ? "line-through" : "none" }}
      >
        {task}
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="delete todo" onClick={deleteTodo}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit todo">
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
