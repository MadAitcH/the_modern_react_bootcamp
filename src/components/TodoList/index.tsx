import { FC, Fragment } from "react";
import { Paper, List, Divider } from "@mui/material";
import TodoItem, { ITodo } from "../TodoItem";

interface TodoListProps {
  todos: ITodo[];
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <Paper>
      <List>
        {todos.map(todo => (
          <Fragment key={todo.id}>
            <TodoItem {...todo} />
            <Divider />
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
