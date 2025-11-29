import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch products of a vendor
export const fetchProductsByVendor = async (vendorId) => {
  const res = await axios.get(`${API_URL}/products/vendor/${vendorId}`);
  return res.data;
};
