import { useSelector } from "react-redux";

export default function ProductTable() {
  const products = useSelector(
    (state) => state.products
  );

  if (!products.length) {
    return (
      <p className="mt-4">
        No products available
      </p>
    );
  }

  return (
    <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto">
      {JSON.stringify(
        products,
        null,
        2
      )}
    </pre>
  );
}