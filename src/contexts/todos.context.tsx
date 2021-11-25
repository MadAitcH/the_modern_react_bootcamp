import { createContext, FC, Dispatch } from "react";
import useLocalStorageReducer from "../hooks/useLocalStorageReducer";
import { ITodo } from "../hooks/useTodoState";
import todoReducer, { ActionType } from "../state/reducers/todo.reducer";

export const TodosContext = createContext<ITodo[]>([]);
export const DispatchContext = createContext<Dispatch<ActionType>>(() => {});

export const TodosProvider: FC = ({ children }) => {
  const [todos, dispatchTodos] = useLocalStorageReducer<ITodo[], ActionType>(
    "react-hooks-todo-list",
    [],
    todoReducer
  );

  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatchTodos}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};
