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
import EditTodoForm from "../EditTodoForm";
import useToggleState from "../../hooks/useToggle";

export interface ITodo {
  id: string;
  task: string;
  completed: boolean;
}

interface TodoItemProps extends ITodo {
  removeTodo: (todoId: string) => void;
  toggleCompletion: (todoId: string) => void;
  editTodo: (todoId: string, task: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  task,
  id,
  completed,
  removeTodo,
  toggleCompletion,
  editTodo,
}) => {
  const [isEditing, toggleIsEditing] = useToggleState(false);

  const deleteTodo = () => {
    removeTodo(id);
  };

  const changeCompletion = () => {
    toggleCompletion(id);
  };

  return (
    <ListItem style={{ height: "64px" }}>
      {isEditing ? (
        <EditTodoForm
          editTodo={editTodo}
          id={id}
          task={task}
          toggleIsEditing={toggleIsEditing}
        />
      ) : (
        <>
          <Checkbox
            tabIndex={-1}
            checked={completed}
            onClick={changeCompletion}
          />
          <ListItemText
            style={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {task}
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label="delete todo" onClick={deleteTodo}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit todo" onClick={toggleIsEditing}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
};

export default TodoItem;
