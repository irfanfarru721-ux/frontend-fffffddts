import React from 'react';
import { useCart } from '../context/CartContext';


export default function CartPage() {
const { cart, loading, updateItem, removeItem, clearCart } = useCart();


const total = (cart.items || []).reduce((s, it) => s + (it.price || 0) * it.qty, 0);


if (loading) return <div>Loading cart...</div>;


return (
<div className="container">
<h2>Your Cart</h2>
{(!cart.items || cart.items.length === 0) && <p>Cart is empty.</p>}


<div>
{cart.items.map((it) => (
<div key={it.product._id || it.product} style={{borderBottom: '1px solid #eee', padding: 12}}>
<h3>{it.name || it.product.name}</h3>
<p>₹ {it.price}</p>
<div>
<button onClick={() => updateItem(it.product._id || it.product, Math.max(1, it.qty - 1))}>-</button>
<span style={{margin: '0 8px'}}>{it.qty}</span>
<button onClick={() => updateItem(it.product._id || it.product, it.qty + 1)}>+</button>
<button onClick={() => removeItem(it.product._id || it.product)} style={{marginLeft:12}}>Remove</button>
</div>
</div>
))}
</div>


<div style={{marginTop:20}}>
<h3>Total: ₹ {total}</h3>
<button onClick={clearCart}>Clear Cart</button>
{/* Add Checkout flow link/button here */}
</div>
</div>
);
}
