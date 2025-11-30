import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
    // update cart when storage changed in other tab (optional)
    const onStorage = () => setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const goToCart = () => navigate("/cart");

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold">Multivendor</Link>
        <Link to="/" className="hidden sm:inline">Modules</Link>
        <Link to="/checkout" className="hidden sm:inline">Checkout</Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Cart icon + badge */}
        <div className="relative">
          <button
            onClick={() => setOpenCart(!openCart)}
            className="relative px-3 py-1 bg-blue-500 rounded"
          >
            Cart
            {cart.length > 0 && (
              <span className="ml-2 inline-block bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {openCart && (
            <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded shadow-lg p-3">
              <h4 className="font-semibold mb-2">Cart</h4>
              {cart.length === 0 ? (
                <p className="text-sm text-gray-600">Your cart is empty.</p>
              ) : (
                <>
                  <div className="max-h-44 overflow-auto">
                    {cart.map((it, i) => (
                      <div key={i} className="flex items-center gap-3 mb-2">
                        <img src={it.image} alt={it.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{it.name}</div>
                          <div className="text-xs text-gray-600">Qty: {it.qty} • ₹{it.price}</div>
                        </div>
                        <div className="text-sm font-semibold">₹{it.price * it.qty}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <button onClick={() => { setOpenCart(false); goToCart(); }} className="bg-blue-600 text-white px-3 py-1 rounded">View Cart</button>
                    <button onClick={() => { setOpenCart(false); navigate('/checkout'); }} className="bg-green-600 text-white px-3 py-1 rounded">Checkout</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Auth */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">{user.name || user.email}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            <Link to="/admin" className="bg-gray-800 px-3 py-1 rounded">Admin</Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-3 py-1 bg-white text-blue-600 rounded">Login</Link>
            <Link to="/register" className="px-3 py-1 border rounded">Sign up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
