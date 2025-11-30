import axios from './api'; // your axios instance


export const fetchCart = () => axios.get('/cart');
export const addOrUpdateCartItem = (productId, qty = 1) => axios.post('/cart', { productId, qty });
export const updateCartItem = (productId, qty) => axios.put('/cart', { productId, qty });
export const removeCartItem = (productId) => axios.delete(`/cart/item/${productId}`);
export const clearCartAPI = () => axios.delete('/cart');
