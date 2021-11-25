import { FC, useContext, memo } from "react";
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
import { DispatchContext } from "../../contexts/todos.context";
import { ITodo } from "../../hooks/useTodoState";

interface TodoItemProps extends ITodo {}

const TodoItem: FC<TodoItemProps> = ({ id, task, completed }) => {
  const [isEditing, toggleIsEditing] = useToggleState(false);
  const dispatchTodos = useContext(DispatchContext);

  const deleteTodo = () => {
    dispatchTodos({ type: "REMOVE", payload: { id } });
  };

  const changeCompletion = () => {
    dispatchTodos({ type: "TOGGLE", payload: { id } });
  };

  return (
    <ListItem style={{ height: "64px" }}>
      {isEditing ? (
        <EditTodoForm id={id} task={task} toggleIsEditing={toggleIsEditing} />
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

export default memo(TodoItem);
