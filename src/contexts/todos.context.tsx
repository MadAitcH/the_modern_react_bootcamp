import { createContext, FC } from "react";
import useTodoState, { TodoStuff } from "../hooks/useTodoState";

export const TodosContext = createContext<TodoStuff>({} as TodoStuff);

export const TodosProvider: FC = ({ children }) => {
  const todosStuff = useTodoState();

  return (
    <TodosContext.Provider value={todosStuff}>{children}</TodosContext.Provider>
  );
};
