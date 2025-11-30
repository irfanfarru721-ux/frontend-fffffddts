import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    // normally send to backend but here we simulate
    alert("Order placed successfully!");

    // clear cart
    localStorage.removeItem("cart");

    navigate("/profile");
  };

  if (cart.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Order Summary */}
      <div className="border p-4 rounded mb-4">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-3" />

        <h2 className="text-lg font-bold">
          Total: ₹{total.toFixed(2)}
        </h2>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Delivery Address:</label>
        <textarea
          className="border p-2 w-full rounded"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter full address"
        ></textarea>
      </div>

      {/* Button */}
      <button
        onClick={placeOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
