import "./TodoList.css";

import { FC, useEffect, useState } from "react";
import NewTodoForm from "../NewTodoForm";
import Todo, { ITodo } from "../Todo";

const TodoList: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("Mustafa's-todo-list");

    if (savedTodos) {
      const todos = JSON.parse(savedTodos);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Mustafa's-todo-list", JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = (newTodo: ITodo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, task: string) => {
    const todo = todos.find((todo) => todo.id === id);
    // Don't create a new task
    if (!todo) return;

    // Remove empty todos.
    if (!task) return removeTodo(id);

    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return { id, task, completed: todo.completed };
      })
    );
  };

  const completeTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        return { id, completed: !todo.completed, task: todo.task };
      })
    );
  };

  const todosEl = todos.map((todo) => (
    <Todo
      {...todo}
      key={todo.id}
      editTodo={editTodo}
      removeTodo={removeTodo}
      completeTodo={completeTodo}
    />
  ));

  return (
    <div className="TodoList">
      <h1>
        Todo List <span>A Simple React Todo List App.</span>
      </h1>
      <ul>{todosEl}</ul>
      <NewTodoForm addNewTodo={addNewTodo} />
    </div>
  );
};

export default TodoList;
