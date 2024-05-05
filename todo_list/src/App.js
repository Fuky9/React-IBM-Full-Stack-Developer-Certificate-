import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Add the handlesubmit code here

  const handleSubmit = (e) => {
    e.preventDefault();

    let todo = document.querySelector("#todoAdd").value;
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
    } else {
      alert("Enter Valid Task");
    }
    document.querySelector("#todoAdd").value = "";
  };

  // Add the deleteToDo code here

  const deleteToDo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Add the toggleComplete code here

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Add the submitEdits code here
  const submitEdits = (newTodo) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newTodo.id) {
        todo.text = document.getElementById(newTodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  };

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="todoAdd" placeholder="Add new task here" />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            {/* if it is edit mode, display input box, else display text */}
            {todo.id === todoEditing ? (
              <input type="text" id={todo.id} defaultValue={todo.text} />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>

          {/* if it is edit mode, allow submit edit, else allow edit */}
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo)}>Submit edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default App;
