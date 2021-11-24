import { FC } from "react";
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
          <>
            <ListItem key={todo.id}>
              <ListItemText>{todo.task}</ListItemText>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
