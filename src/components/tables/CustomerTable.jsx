import { useSelector } from "react-redux";

export default function CustomerTable() {
  const customers = useSelector(
    (state) => state.customers
  );

  if (!customers.length) {
    return (
      <p className="mt-4">
        No customers available
      </p>
    );
  }

  return (
    <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto">
      {JSON.stringify(
        customers,
        null,
        2
      )}
    </pre>
  );
}