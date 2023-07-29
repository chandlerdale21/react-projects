import "./styles.css";
import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewToDoForm";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
      });
    });
  }
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos)), [todos];
  });

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  console.log(todos);
  return (
    <>
      <NewTodoForm setTodos={setTodos} />
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />

                {todo.title}
              </label>
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.id)}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
