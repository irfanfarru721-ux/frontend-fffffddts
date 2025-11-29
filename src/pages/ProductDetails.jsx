import React, { useEffect, useState } from "react";
import { getProduct } from "../api/api";
import { useParams } from "react-router-dom";

export default function ProductDetails(){
  const { id } = useParams();
  const [product,setProduct] = useState(null);
  useEffect(()=> {
    if(!id) return;
    getProduct(id).then(r=> setProduct(r.data));
  },[id]);
  if(!product) return <div className="container">Loading...</div>;
  return (
    <div className="container">
      <h2>{product.name}</h2>
      <p>₹ {product.price}</p>
      <p>{product.description}</p>
      <p>Vendor: {product.vendor?.name}</p>
      <p>Module: {product.module?.name}</p>
    </div>
  );
}
