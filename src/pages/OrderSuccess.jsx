import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600">🎉 Order Placed Successfully!</h1>

      <p className="mt-4 text-lg">
        Thank you for your purchase. Your order is being processed.
      </p>

      <div className="mt-6">
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Home
        </Link>
      </div>

      <div className="mt-4">
        <Link
          to="/orders"
          className="text-blue-600 underline"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}
