import { createContext, FC, useReducer, Dispatch } from "react";
import { ITodo } from "../hooks/useTodoState";
import TodosReducer, { ActionType } from "../state/reducers/todo.reducer";

export const TodosContext = createContext<ITodo[]>([]);
export const DispatchContext = createContext<Dispatch<ActionType>>(() => {});

export const TodosProvider: FC = ({ children }) => {
  const [todos, dispatchTodos] = useReducer(TodosReducer, []);

  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatchTodos}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};
