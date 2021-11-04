import { Component } from "react";
import Todo, { ITodo } from "../Todo";

interface TodoListState {
  todos: ITodo[];
}

class TodoList extends Component<any, TodoListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      todos: [
        { id: "1", task: "Build a todo app" },
        { id: "2", task: "Style your app" },
        { id: "3", task: "Practice MySQL" },
      ],
    };

    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  removeTodo(id: string) {
    this.setState((st) => ({
      todos: st.todos.filter((todo) => todo.id !== id),
    }));
  }

  editTodo(id: string, task: string) {
    const todo = this.state.todos.find((todo) => todo.id === id);
    // Don't create a new task
    if (!todo) return;

    // Remove empty todos.
    if (!task) return this.removeTodo(id);

    this.setState((st) => {
      return {
        todos: st.todos.map((todo) => {
          if (todo.id !== id) return todo;

          return { id, task };
        }),
      };
    });
  }

  render() {
    const todos = this.state.todos.map((todo) => (
      <Todo {...todo} editTodo={this.editTodo} removeTodo={this.removeTodo} />
    ));

    return (
      <div className="TodoLilst">
        <h1>Todo List</h1>
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
