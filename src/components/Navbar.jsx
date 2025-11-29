import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold">
        <Link to="/">Multivendor</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/">Modules</Link>
        <Link to="/checkout" className="relative">
          Checkout
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full px-2">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
