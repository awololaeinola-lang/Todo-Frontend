import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const FILTERS = [
  { label: "All", value: "" },
  { label: "Today", value: "today" },
  { label: "Overdue", value: "overdue" },
  { label: "High", value: "high" },
];

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");

  const fetchTodos = async (filter = "") => {
    const res = await fetch(
      `http://localhost:5000/api/todos?filter=${filter}`
    );
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos(activeFilter);
  }, [activeFilter]);

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos(activeFilter);
  };

  const toggleTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
    });
    fetchTodos(activeFilter);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setTodos(items);

    await fetch("http://localhost:5000/api/todos/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todos: items }),
    });
  };

  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>💬 Chatly</h1>
        <p style={subtitle}>Plan better. Flow smarter.</p>

        <div style={filterBar}>
          {FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveFilter(f.value)}
              style={{
                ...filterBtn,
                background:
                  activeFilter === f.value ? "#7C3AED" : "#F3F4F6",
                color:
                  activeFilter === f.value ? "#ffffff" : "#374151",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <AddTodo fetchTodos={() => fetchTodos(activeFilter)} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ listStyle: "none", padding: 0, marginTop: "16px" }}
              >
                {todos.map((todo, index) => (
                  <Draggable
                    key={todo._id}
                    draggableId={todo._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem
                          todo={todo}
                          deleteTodo={deleteTodo}
                          toggleTodo={toggleTodo}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "#f9fafb",
  display: "flex",
  justifyContent: "center",
  paddingTop: "60px",
};

const container = {
  width: "100%",
  maxWidth: "480px",
  background: "#ffffff",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const title = { color: "#7C3AED" };
const subtitle = { color: "#6b7280", marginBottom: "16px" };

const filterBar = {
  display: "flex",
  gap: "8px",
  marginBottom: "16px",
  flexWrap: "wrap",
};

const filterBtn = {
  padding: "6px 14px",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
};

export default Home;
