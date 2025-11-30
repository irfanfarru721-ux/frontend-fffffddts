import React, { createContext, useContext, useEffect, useState } from 'react';
import * as cartAPI from '../api/cart';
import { useAuth } from './AuthContext'; // assumes you have an AuthContext that exposes token & user


const CartContext = createContext();


export const CartProvider = ({ children }) => {
const { token, user } = useAuth();
const [cart, setCart] = useState({ items: [] });
const [loading, setLoading] = useState(false);


// set axios auth header globally if using axios instance
useEffect(() => {
// on login/logout, re-fetch cart
const fetch = async () => {
if (!token) return setCart({ items: [] });
try {
setLoading(true);
const res = await cartAPI.fetchCart();
setCart(res.data);
} catch (err) {
console.error('Failed to fetch cart', err);
} finally {
setLoading(false);
}
};
fetch();
}, [token, user]);


const addItem = async (productId, qty = 1) => {
if (!token) throw new Error('Not authenticated');
const res = await cartAPI.addOrUpdateCartItem(productId, qty);
setCart(res.data);
};


const updateItem = async (productId, qty) => {
if (!token) throw new Error('Not authenticated');
const res = await cartAPI.updateCartItem(productId, qty);
setCart(res.data);
};


const removeItem = async (productId) => {
if (!token) throw new Error('Not authenticated');
const res = await cartAPI.removeCartItem(productId);
setCart(res.data);
};


const clearCart = async () => {
if (!token) throw new Error('Not authenticated');
const res = await cartAPI.clearCartAPI();
setCart(res.data);
};


return (
<CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, clearCart }}>
{children}
</CartContext.Provider>
);
};


export const useCart = () => useContext(CartContext);
