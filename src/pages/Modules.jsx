import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Modules() {
  const [modules, setModules] = useState([]);

  const backend = "https://srudentbackend-1.onrender.com";

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await fetch(`${backend}/api/modules`);
      const data = await res.json();
      setModules(data);
    } catch (error) {
      console.error("Modules fetch error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Main Categories</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {modules.map((m) => (
          <Link
            key={m._id}
            to={`/module/${m._id}`}
            style={{
              textDecoration: "none",
              color: "black",
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              background: "#fff",
            }}
          >
            <h2>{m.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
