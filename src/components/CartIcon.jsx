import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';


export default function CartIcon() {
const { cart } = useCart();
const count = cart.items ? cart.items.reduce((s, it) => s + it.qty, 0) : 0;


return (
<Link to="/cart" style={{position:'relative', padding:8}}>
<span>Cart</span>
{count > 0 && (
<span style={{position:'absolute', top:0, right:0, background:'red', color:'#fff', borderRadius:12, padding:'2px 6px', fontSize:12}}>{count}</span>
)}
</Link>
);
}
