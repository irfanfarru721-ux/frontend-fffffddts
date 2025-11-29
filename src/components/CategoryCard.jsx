// src/components/CategoryCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category._id}/vendors`} style={card}>
      <h3>{category.name}</h3>
    </Link>
  );
}

const card = {
  padding: "15px",
  margin: "10px 0",
  background: "#eee",
  borderRadius: "8px",
  display: "block",
  textDecoration: "none",
  color: "#222",
};
