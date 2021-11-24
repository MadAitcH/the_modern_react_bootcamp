import { FC, Fragment } from "react";
import { Paper, List, ListItem, ListItemText, Divider } from "@mui/material";

export interface ITodo {
  id: string;
  task: string;
  completed: boolean;
}

interface TodoListProps {
  todos: ITodo[];
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <Paper>
      <List>
        {todos.map(todo => (
          <Fragment key={todo.id}>
            <ListItem>
              <ListItemText>{todo.task}</ListItemText>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
