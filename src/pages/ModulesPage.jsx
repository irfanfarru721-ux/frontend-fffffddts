import React, { useEffect, useState } from "react";
import { getModules } from "../api/api";
import { Link } from "react-router-dom";

export default function Modules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getModules().then((res) => setModules(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modules</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {modules.map((m) => (
          <Link
            key={m._id}
            to={`/vendors/${m._id}`}
            className="border rounded-lg shadow p-4 hover:shadow-lg hover:bg-gray-50 transition"
          >
            <img
              src={`/assets/${m.image}`}
              alt={m.name}
              className="h-32 w-full object-cover rounded"
            />
            <h2 className="mt-2 text-lg font-semibold text-center">{m.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
