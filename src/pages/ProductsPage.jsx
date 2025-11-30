import React, { useEffect, useState } from "react";
import { getProductsByVendor } from "../api/api";
import { useParams, Link } from "react-router-dom";

export default function ProductsPage() {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!vendorId) return;
    getProductsByVendor(vendorId).then((res) => setProducts(res.data || []));
  }, [vendorId]);

  // -------------------------
  // Add to Cart (temporary)
  // -------------------------
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="container">
      <h2>Products</h2>

      {products.length === 0 && <p>No products found.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
          gap: 12,
        }}
      >
        {products.map((p) => (
          <div key={p._id} className="card" style={{ padding: 12 }}>
            <Link to={`/product/${p._id}`}>
              <h3>{p.name}</h3>
            </Link>

            <p>₹ {p.price}</p>

            <button
              onClick={() => handleAddToCart(p)}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                background: "black",
                color: "white",
                borderRadius: 5,
                border: "none",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
