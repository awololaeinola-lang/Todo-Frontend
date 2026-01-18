import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo, toggleTodo, updateTodo }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;






