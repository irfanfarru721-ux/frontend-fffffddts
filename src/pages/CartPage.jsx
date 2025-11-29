import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>
          Cart is empty.{" "}
          <Link to="/" className="text-blue-600">
            Go shopping
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>₹{item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="bg-gray-300 px-2"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="bg-gray-300 px-2"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total + Checkout */}
          <div className="mt-5">
            <h2 className="text-xl font-semibold">
              Total: ₹{total.toFixed(2)}
            </h2>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
