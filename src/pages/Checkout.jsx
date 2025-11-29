import React, { useState } from "react";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const total = cart.reduce((acc, p) => acc + p.price * p.qty, 0);

  const handlePlaceOrder = () => {
    alert(`Order placed! Total: ₹${total}`);
    localStorage.removeItem("cart");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      ></textarea>
      <p className="font-semibold mb-2">Total: ₹{total}</p>
      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4 hover:bg-green-700 transition"
      >
        Place Order
      </button>
    </div>
  );
}
