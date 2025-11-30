import axios from 'axios';


const instance = axios.create({
baseURL: process.env.REACT_APP_API_BASE || '/api',
withCredentials: true,
});


// attach token from localStorage (or from AuthContext global store)
instance.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});


export default instance;
