import { FC, useContext, Fragment } from "react";
import { Paper, List, Divider } from "@mui/material";
import TodoItem from "../TodoItem";
import { TodosContext } from "../../contexts/todos.context";

const TodoList: FC = () => {
  const { todos } = useContext(TodosContext);

  return todos.length ? (
    <Paper>
      <List>
        {todos.map((todo, i) => (
          <Fragment key={todo.id}>
            <TodoItem {...todo} />
            {i < todos.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </Paper>
  ) : null;
};

export default TodoList;
