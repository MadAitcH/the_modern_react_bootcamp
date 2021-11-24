import { FC, Fragment } from "react";
import { Paper, List, Divider } from "@mui/material";
import TodoItem, { ITodo } from "../TodoItem";

interface TodoListProps {
  todos: ITodo[];
  removeTodo: (todoId: string) => void;
  toggleCompletion: (todoId: string) => void;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  removeTodo,
  toggleCompletion,
}) => {
  return (
    <Paper>
      <List>
        {todos.map(todo => (
          <Fragment key={todo.id}>
            <TodoItem
              {...todo}
              removeTodo={removeTodo}
              toggleCompletion={toggleCompletion}
            />
            <Divider />
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
