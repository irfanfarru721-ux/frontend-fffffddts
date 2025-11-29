// src/pages/VendorProducts.jsx
import React, { useEffect, useState } from "react";
import { getProductsByShop } from "../api/products";
import { Link, useParams } from "react-router-dom";

export default function VendorProducts() {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [vendorId]);

  async function loadProducts() {
    const data = await getProductsByShop(vendorId);
    setProducts(data);
  }

  return (
    <div className="page">
      <h2>Products</h2>

      {products.map((p) => (
        <Link key={p._id} to={`/product/${p._id}`} className="card">
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
        </Link>
      ))}
    </div>
  );
}
