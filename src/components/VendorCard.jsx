// src/components/VendorCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function VendorCard({ vendor }) {
  return (
    <Link to={`/vendor/${vendor._id}/products`} style={card}>
      <h3>{vendor.name}</h3>
      <p>{vendor.address}</p>
    </Link>
  );
}

const card = {
  padding: "15px",
  margin: "10px 0",
  background: "#f9f9f9",
  borderRadius: "8px",
  display: "block",
  textDecoration: "none",
  color: "#222",
};
