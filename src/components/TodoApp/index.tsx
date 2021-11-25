import { FC, useState } from "react";
import { AppBar, Paper, Toolbar, Typography, Grid } from "@mui/material";
import TodoList from "../TodoList";
import { ITodo } from "../TodoItem";
import TodoForm from "../TodoForm";
import { v4 as uuidv4 } from "uuid";

const initialTodos: ITodo[] = [
  { id: "1", task: "finish the app", completed: false },
  { id: "2", task: "Complete the react colors app", completed: true },
  { id: "3", task: "watch the Great", completed: false },
];

const TodoApp: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);

  // useEffect(() => console.log(todos), [todos]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: text,
        completed: false,
      },
    ]);
  };

  const removeTodo = (todoId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const toggleCompletion = (todoId: string) => {
    setTodos(
      todos.map(todo =>
        todoId === todo.id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (todoId: string, task: string) => {
    setTodos(
      todos.map(todo => (todoId === todo.id ? { ...todo, task } : todo))
    );
  };

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
