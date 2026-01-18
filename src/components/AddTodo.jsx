import { useState } from "react";

const AddTodo = ({ fetchTodos }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    setLoading(true);

    try {
      await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          priority,
          dueDate: dueDate || null,
        }),
      });

      // Reset form
      setTask("");
      setPriority("Medium");
      setDueDate("");

      fetchTodos();
    } catch (err) {
      console.error("Add todo error:", err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={card}>
      <input
        type="text"
        placeholder="What do you want to do?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={input}
      />

      <div style={row}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={select}
        >
          <option value="Low">Low priority</option>
          <option value="Medium">Medium priority</option>
          <option value="High">High priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={date}
        />
      </div>

      <button type="submit" disabled={loading} style={button}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

/* ================= STYLES ================= */

const card = {
  background: "#ffffff",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
};

const row = {
  display: "flex",
  gap: "12px",
  marginTop: "12px",
};

const select = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
};

const date = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
};

const button = {
  marginTop: "16px",
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#111827",
  color: "#ffffff",
  fontWeight: "600",
  cursor: "pointer",
};

export default AddTodo;
