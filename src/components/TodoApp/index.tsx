import { FC, useState } from "react";
import { AppBar, Paper, Toolbar, Typography } from "@mui/material";
import TodoList, { ITodo } from "../TodoList";

const initialTodos: ITodo[] = [
  { id: "1", task: "finish the app", completed: false },
  { id: "2", task: "Complete the react colors app", completed: true },
  { id: "3", task: "watch the Great", completed: false },
];

const TodoApp: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);

  return (
    <Paper
      style={{
        padding: 0,
        margin: 0,
        height: "100vh",
        backgroundColor: "#fafafa",
      }}
      elevation={0}
    >
      <AppBar color="primary" position="static" style={{ height: "64px" }}>
        <Toolbar>
          <Typography color="inherit">Todos with Hooks</Typography>
        </Toolbar>
      </AppBar>
      <TodoList todos={todos} />
    </Paper>
  );
};

export default TodoApp;
