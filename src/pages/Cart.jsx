import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (index) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
    }
  };

  const updateQuantity = (index, qty) => {
    const newCart = [...cart];
    newCart[index].quantity = qty > 0 ? qty : 1;
    setCart(newCart);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="container" style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                marginBottom: 10,
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price} x </p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) => updateQuantity(idx, parseInt(e.target.value))}
                  style={{ width: 50 }}
                />
              </div>
              <div>
                <button
                  onClick={() => removeItem(idx)}
                  style={{ background: "red", color: "#fff", padding: "5px 10px", border: "none", borderRadius: 4 }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{totalPrice}</h3>
          <button
            onClick={clearCart}
            style={{ background: "darkred", color: "#fff", padding: "8px 12px", border: "none", borderRadius: 4 }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
