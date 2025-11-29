import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all main modules (Restaurant, Grocery…)
export const fetchModules = async () => {
  const res = await axios.get(`${API_URL}/modules`);
  return res.data;
};
