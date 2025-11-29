import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch vendors for a module
export const fetchVendors = async (moduleId) => {
  const res = await axios.get(`${API_URL}/vendors/module/${moduleId}`);
  return res.data;
};
