import { FC, Fragment } from "react";
import { Paper, List, Divider } from "@mui/material";
import TodoItem, { ITodo } from "../TodoItem";

interface TodoListProps {
  todos: ITodo[];
  removeTodo: (todoId: string) => void;
  toggleCompletion: (todoId: string) => void;
  editTodo: (todoId: string, task: string) => void;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  removeTodo,
  toggleCompletion,
  editTodo,
}) => {
  return todos.length ? (
    <Paper>
      <List>
        {todos.map((todo, i) => (
          <Fragment key={todo.id}>
            <TodoItem
              {...todo}
              removeTodo={removeTodo}
              toggleCompletion={toggleCompletion}
              editTodo={editTodo}
            />
            {i < todos.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </Paper>
  ) : null;
};

export default TodoList;
