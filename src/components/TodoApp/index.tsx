import { FC } from "react";
import { AppBar, Paper, Toolbar, Typography, Grid } from "@mui/material";
import TodoList from "../TodoList";
import TodoForm from "../TodoForm";
import useTodoState from "../../hooks/useTodoState";

const TodoApp: FC = () => {
  const { todos, addTodo, removeTodo, editTodo, toggleCompletion } =
    useTodoState([]);

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
      <Grid container justifyContent="center" mt="1rem">
        <Grid item xs={11} md={8} lg={4}>
          <TodoForm addTodo={addTodo} />
          <TodoList
            todos={todos}
            removeTodo={removeTodo}
            toggleCompletion={toggleCompletion}
            editTodo={editTodo}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TodoApp;
