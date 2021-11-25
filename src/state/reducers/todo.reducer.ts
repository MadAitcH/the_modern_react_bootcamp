import { v4 as uuidv4 } from "uuid";
import { ITodo } from "../../hooks/useTodoState";

export type ActionType =
  | { type: "ADD"; payload: { task: string } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "TOGGLE"; payload: { id: string } }
  | { type: "EDIT"; payload: { id: string; newTask: string } };

const reducer = (state: ITodo[], action: ActionType) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: uuidv4(),
          task: action.payload.task,
          completed: false,
        },
      ];

    case "REMOVE":
      return state.filter(todo => todo.id !== action.payload.id);

    case "TOGGLE":
      return state.map(todo =>
        action.payload.id === todo.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "EDIT":
      return state.map(todo =>
        action.payload.id === todo.id
          ? { ...todo, task: action.payload.newTask }
          : todo
      );

    default:
      return state;
  }
};
export default reducer;
