import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(saved);
  }, []);

  if (orders.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="border p-4 rounded">
            <h2 className="font-semibold text-lg">
              Order #{index + 1}
            </h2>
            <p className="text-sm text-gray-600">
              Date: {order.date}
            </p>

            <div className="mt-3">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between py-1"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <hr className="my-3" />

            <h3 className="font-bold text-xl">
              Total: ₹{order.total}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
