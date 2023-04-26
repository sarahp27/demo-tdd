import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { act } from "@testing-library/react";
// import TodoItem from "./components/TodoItem";
// import Card from "./components/Card";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState("");

  function onChange(e) {
    const value = e.target.value;
    setNewTodo(value);
  }
  function onChangeDate(e) {
    console.log(e.target.value);
    setDate(e.target.value);
  }

  function removeTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function updateTodo(id) {
    setLoading(true);
    const newList = todos.map((todoItem) => {
      if (todoItem.id === id) {
        const updatedItem = { ...todoItem, completed: !todoItem.completed };
        return updatedItem;
      }
      return todoItem;
    });
    setTodos(newList);
    setLoading(false);
  }

  function edit(id) {
    let editedList = todos.map((e, i) => {
      if (i == id - 1) {
        // console.log("HEREEE", todos[id - 1]);
        todos[id - 1] = {
          userId: 1,
          id: id,
          title: prompt("new todo"),
          completed: false,
          date: prompt("date"),
        };
      }
      setTodos([...todos]);
    });
  }
  function addTodo(e) {
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      completed: false,
      date: date,
    };

    setSaving(true);
    fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos(todos.concat({ ...result, id: value.id }));
        setSaving(false);
      });
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(process.env.REACT_APP_API_URL).then(
        (response) => response.json()
      );
      act(() => {
        setTodos(result.slice(0, 5));
        setLoading(false);
      });
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
      {loading ? (
        "Loading"
      ) : (
        <TodoList
          todos={todos}
          removeHandler={removeTodo}
          updateTodo={updateTodo}
          edit={edit}
        />
      )}

      <div className="add-todo-form">
        {saving ? (
          "Saving"
        ) : (
          <form onSubmit={addTodo}>
            <input type="text" onChange={onChange} />
            <input type="date" onChange={onChangeDate} />
            <button type="submit">Add new todo</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
