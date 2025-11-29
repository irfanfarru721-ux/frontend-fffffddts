import React, { useEffect, useState } from "react";
import { getVendorsByModule } from "../api/api";
import { useParams, Link } from "react-router-dom";

export default function Vendors() {
  const { moduleId } = useParams();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getVendorsByModule(moduleId).then((res) => setVendors(res.data));
  }, [moduleId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendors</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vendors.map((v) => (
          <Link
            key={v._id}
            to={`/products/${v._id}`}
            className="border rounded-lg shadow p-4 hover:shadow-lg hover:bg-gray-50 transition"
          >
            <img
              src={`/assets/${v.image}`}
              alt={v.name}
              className="h-32 w-full object-cover rounded"
            />
            <h2 className="mt-2 text-lg font-semibold text-center">{v.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
