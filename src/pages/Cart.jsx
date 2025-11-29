import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart from storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  // Save after every update
  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].qty += 1;
    saveCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
    }
    saveCart(updated);
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    saveCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0)
    return <p className="p-4 text-gray-600 text-lg">Your cart is empty.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.map((item, index) => (
        <div
          key={index}
          className="flex items-center border p-3 rounded mb-3 shadow"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded object-cover"
          />

          <div className="ml-4 flex-1">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-700">₹{item.price}</p>

            <div className="flex items-center mt-2">
              <button
                onClick={() => decreaseQty(index)}
                className="bg-gray-300 px-2 py-1 rounded"
              >
                -
              </button>

              <span className="px-4">{item.qty}</span>

              <button
                onClick={() => increaseQty(index)}
                className="bg-gray-300 px-2 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => removeItem(index)}
            className="text-red-500 font-bold ml-3"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="border-t pt-4 mt-4">
        <h2 className="text-xl font-bold">Total: ₹{total}</h2>

        <button className="bg-green-600 text-white px-4 py-2 rounded mt-4">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
