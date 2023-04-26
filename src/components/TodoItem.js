import React from "react";
import styles from "./TodoItem.module.css";
import { date } from "./Date";
const TodoItem = ({ todo, removeHandler, updateTodo, edit }) => (
  <div className={styles.itemContainer}>
    <div>
      <input
        type="checkbox"
        name={`checkbox-${todo.id}`}
        checked={todo.completed}
        data-testid={`checkbox-${todo.id}`}
        onChange={() => updateTodo(todo.id)}
      />
      <label
        htmlFor={`checkbox-${todo.id}`}
        onClick={() => updateTodo(todo.id)}
        className={todo.completed ? styles.completed : ""}
      >
        {todo.title}
      </label>
      <label
        htmlFor={`checkbox-${todo.id}`}
        onClick={() => updateTodo(todo.id)}
        className={todo.date < date ? styles.date : styles.dateTwo}
      >
        {todo.date ?? ""}
      </label>
    </div>
    <div style={{ display: "flex" }}>
      <button
        style={{ marginRight: 10 }}
        className={styles.closeBtn}
        data-testid={`close-btn-${todo.id}`}
        onClick={() => edit(todo.id)}
      >
        Edit
      </button>
      <button
        className={styles.closeBtn}
        data-testid={`close-btn-${todo.id}`}
        onClick={() => removeHandler(todo.id)}
      >
        X
      </button>
    </div>
  </div>
);

export default TodoItem;
