import { useSelector } from "react-redux";

export default function InvoiceTable() {
  const invoices = useSelector(
    (state) => state.invoices
  );

  if (!invoices.length) {
    return (
      <p className="mt-4">
        No invoices available
      </p>
    );
  }

  return (
    <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto">
      {JSON.stringify(
        invoices,
        null,
        2
      )}
    </pre>
  );
}