import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (idx) => {
    if (window.confirm("Remove this item?")) {
      const newCart = [...cart];
      newCart.splice(idx, 1);
      setCart(newCart);
    }
  };

  const clearCart = () => {
    if (window.confirm("Clear entire cart?")) {
      setCart([]);
    }
  };

  const updateQuantity = (idx, qty) => {
    const newCart = [...cart];
    newCart[idx].qty = qty > 0 ? qty : 1;
    setCart(newCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);

  if (!cart.length) return <p className="p-4">Your cart is empty</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.map((item, idx) => (
        <div key={item.id || idx} className="border p-4 rounded flex justify-between items-center mb-4">
          <div>
            <h4 className="font-bold">{item.name}</h4>
            <p>₹{item.price} x
              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) => updateQuantity(idx, parseInt(e.target.value))}
                className="border ml-2 w-16 px-1 rounded"
              />
            </p>
          </div>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => removeItem(idx)}
          >
            Remove
          </button>
        </div>
      ))}
      <h3 className="text-xl font-bold mt-4">Total: ₹{total}</h3>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
