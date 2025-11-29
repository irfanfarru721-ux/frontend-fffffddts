import React, { useEffect, useState } from "react";
import { getProductsByVendor } from "../api/api";
import { useParams } from "react-router-dom";

export default function Products() {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByVendor(vendorId).then((res) => setProducts(res.data));
  }, [vendorId]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((p) => p._id === product._id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg shadow p-4 flex flex-col">
            <img
              src={`/assets/${p.image}`}
              alt={p.name}
              className="h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600 mt-1">{p.description}</p>
            <p className="mt-2 font-bold text-green-700">₹{p.price}</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-auto bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
