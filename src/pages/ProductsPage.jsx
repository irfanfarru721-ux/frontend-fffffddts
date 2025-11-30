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

  return (
    <div className="container">
      <h2>Products</h2>
      {products.length === 0 && <p>No products found.</p>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
        {products.map((p) => (
          <Link key={p._1d || p._id} to={`/product/${p._id}`} className="card">
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
