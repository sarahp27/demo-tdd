import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, removeHandler, updateTodo, edit }) => (
  <div>
    <p>{console.log(todos)}</p>
    {todos.map((t, i) => (
      <TodoItem
        key={i}
        todo={t}
        removeHandler={removeHandler}
        updateTodo={updateTodo}
        edit={edit}
      />
    ))}
  </div>
);

export default TodoList;
