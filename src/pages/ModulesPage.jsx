import React, { useEffect, useState } from "react";
import { getModules } from "../api/api";
import { Link } from "react-router-dom";

export default function ModulesPage() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getModules().then((res) => setModules(res.data || []));
  }, []);

  return (
    <div style={{ padding: 20 }} className="container">
      <h2>Categories</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
        {modules.map((m) => (
          <Link key={m._id} to={`/modules/${m._id}/vendors`} className="card">
            <h3>{m.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
