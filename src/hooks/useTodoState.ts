import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "./useLocalStorageState";

export interface ITodo {
  id: string;
  task: string;
  completed: boolean;
}

export interface TodoStuff {
  todos: ITodo[];
  addTodo: (text: string) => void;
  removeTodo: (todoId: string) => void;
  toggleCompletion: (todoId: string) => void;
  editTodo: (todoId: string, task: string) => void;
}

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
  } as const;
}
