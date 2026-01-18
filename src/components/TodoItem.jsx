import React from "react";
import { FaTrash, FaCheckCircle, FaGripLines } from "react-icons/fa";

const priorityColors = {
  Low: "#22c55e",
  Medium: "#f59e0b",
  High: "#ef4444",
};

function TodoItem({ todo, deleteTodo, toggleTodo, dragHandle }) {
  return (
    <li style={card}>
      <div style={left}>
        {/* Drag Handle */}
        <span {...dragHandle} style={handle}>
          <FaGripLines />
        </span>

        <button
          onClick={() => toggleTodo(todo._id)}
          style={checkBtn}
          title="Mark complete"
        >
          <FaCheckCircle
            size={18}
            color={todo.completed ? "#22c55e" : "#d1d5db"}
          />
        </button>

        <div>
          <p
            style={{
              ...task,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#9ca3af" : "#111827",
            }}
          >
            {todo.task}
          </p>

          <div style={meta}>
            {todo.priority && (
              <span
                style={{
                  ...badge,
                  background: priorityColors[todo.priority],
                }}
              >
                {todo.priority}
              </span>
            )}

            {todo.dueDate && (
              <span style={date}>
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteTodo(todo._id)}
        style={deleteBtn}
        title="Delete"
      >
        <FaTrash />
      </button>
    </li>
  );
}

/* ================= STYLES ================= */

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 16px",
  background: "#ffffff",
  borderRadius: "12px",
  marginBottom: "12px",
  border: "1px solid #e5e7eb",
  transition: "all 0.2s ease",
  cursor: "grab", // drag cursor
};

const left = {
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
};

const handle = {
  padding: "6px",
  borderRadius: "8px",
  background: "#f3f4f6",
  cursor: "grab",
  display: "flex",
  alignItems: "center",
};

const checkBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  paddingTop: "4px",
};

const task = {
  margin: 0,
  fontSize: "15px",
  fontWeight: "500",
};

const meta = {
  marginTop: "6px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const badge = {
  fontSize: "11px",
  color: "#ffffff",
  padding: "3px 8px",
  borderRadius: "999px",
};

const date = {
  fontSize: "12px",
  color: "#6b7280",
};

const deleteBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#ef4444",
};

export default TodoItem;
