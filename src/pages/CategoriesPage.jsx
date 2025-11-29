// src/pages/CategoriesPage.jsx
import React, { useEffect, useState } from "react";
import { getModules } from "../api/api";
import { Link } from "react-router-dom";

export default function CategoriesPage() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getModules().then((res) => {
      setModules(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Categories</h2>

      {modules.length === 0 && <p>No Categories found.</p>}

      {modules.map((m) => (
        <div key={m._id} className="card">
          <Link to={`/vendors/${m._id}`}>
            <h3>{m.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
