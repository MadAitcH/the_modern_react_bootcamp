import { FC } from "react";
import { AppBar, Paper, Toolbar, Typography, Grid } from "@mui/material";
import TodoList from "../TodoList";
import TodoForm from "../TodoForm";
import { TodosProvider } from "../../contexts/todos.context";

const TodoApp: FC = () => {
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
          <TodosProvider>
            <TodoForm />
            <TodoList />
          </TodosProvider>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TodoApp;
