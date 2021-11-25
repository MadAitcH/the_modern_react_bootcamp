import { createContext, FC, useReducer, Dispatch } from "react";
import { ITodo } from "../hooks/useTodoState";
import TodosReducer, { ActionType } from "../state/reducers/todo.reducer";

interface ITodoContext {
  todos: ITodo[];
  dispatchTodos: Dispatch<ActionType>;
}

export const TodosContext = createContext<ITodoContext>({} as ITodoContext);

export const TodosProvider: FC = ({ children }) => {
  const [todos, dispatchTodos] = useReducer(TodosReducer, []);

  return (
    <TodosContext.Provider value={{ todos, dispatchTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
