import "./TodoList.css";

import { Component } from "react";
import NewTodoForm from "../NewTodoForm";
import Todo, { ITodo } from "../Todo";

interface TodoListState {
  todos: ITodo[];
}

class TodoList extends Component<any, TodoListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      todos: [
        { id: "1", completed: false, task: "Build a todo app" },
        { id: "2", completed: false, task: "Style your app" },
        { id: "3", completed: false, task: "Practice MySQL" },
      ],
    };

    this.completeTodo = this.completeTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  addNewTodo(newTodo: ITodo) {
    this.setState((st) => {
      return {
        todos: [...st.todos, newTodo],
      };
    });
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

          return { id, task, completed: todo.completed };
        }),
      };
    });
  }

  completeTodo(id: string) {
    this.setState((st) => {
      return {
        todos: st.todos.map((todo) => {
          if (todo.id !== id) return todo;

          return { id, completed: !todo.completed, task: todo.task };
        }),
      };
    });
  }

  render() {
    const todos = this.state.todos.map((todo) => (
      <Todo
        {...todo}
        key={todo.id}
        editTodo={this.editTodo}
        removeTodo={this.removeTodo}
        completeTodo={this.completeTodo}
      />
    ));

    return (
      <div className="TodoList">
        <h1>
          Todo List <span>A Simple React Todo List App.</span>
        </h1>
        <ul>{todos}</ul>
        <NewTodoForm addNewTodo={this.addNewTodo} />
      </div>
    );
  }
}

export default TodoList;
