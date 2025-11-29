// src/components/ErrorMessage.jsx
import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div style={{ padding: "10px", background: "#ffdddd", color: "#900" }}>
      <strong>Error:</strong> {message}
    </div>
  );
}
