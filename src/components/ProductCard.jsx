// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} style={card}>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
    </Link>
  );
}

const card = {
  padding: "15px",
  margin: "10px 0",
  background: "#fff",
  borderRadius: "8px",
  display: "block",
  border: "1px solid #ddd",
  textDecoration: "none",
  color: "#222",
};
