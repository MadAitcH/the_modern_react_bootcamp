import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "./useLocalStorageState";
import { ITodo } from "../components/TodoItem";

export default function useTodoState(initialValue: ITodo[] = []) {
  const [todos, setTodos] = useLocalStorageState<ITodo[]>(
    "react-hooks-todo-list",
    initialValue
  );

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

  return {
    todos,
    addTodo,
    removeTodo,
    toggleCompletion,
    editTodo,
  };
}
