import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ModuleShops() {
  const { id } = useParams(); // moduleId
  const [shops, setShops] = useState([]);
  const [module, setModule] = useState(null);

  const backend = "https://srudentbackend-1.onrender.com";

  useEffect(() => {
    fetchModule();
    fetchShops();
  }, [id]);

  const fetchModule = async () => {
    try {
      const res = await fetch(`${backend}/api/modules/${id}`);
      const data = await res.json();
      setModule(data);
    } catch (error) {
      console.error("Module fetch error:", error);
    }
  };

  const fetchShops = async () => {
    try {
      const res = await fetch(`${backend}/api/shops/module/${id}`);
      const data = await res.json();
      setShops(data);
    } catch (error) {
      console.error("Shops fetch error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{module?.name || "Shops"}</h1>

      {shops.length === 0 && (
        <h3>No shops available in this category.</h3>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {shops.map((shop) => (
          <Link
            key={shop._id}
            to={`/vendor/${shop._id}`}
            style={{
              textDecoration: "none",
              color: "black",
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              background: "#fff",
            }}
          >
            <h2>{shop.name}</h2>
            <p style={{ opacity: 0.7 }}>{shop.address}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
