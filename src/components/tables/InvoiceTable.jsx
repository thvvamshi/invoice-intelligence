import { useState } from "react";
import { useSelector } from "react-redux";

export default function InvoiceTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const invoices = useSelector((state) => state.invoices);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.customer_id?.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedInvoices = [...filteredInvoices];

  switch (sortBy) {
    case "amount-high":
      sortedInvoices.sort(
        (a, b) => (b.total_amount || 0) - (a.total_amount || 0),
      );
      break;

    case "amount-low":
      sortedInvoices.sort(
        (a, b) => (a.total_amount || 0) - (b.total_amount || 0),
      );
      break;

    default:
      break;
  }

  if (!invoices.length) {
    return (
      <div className="mt-4 rounded-lg border bg-white p-8 text-center">
        <h3 className="text-lg font-semibold">No Invoices Found</h3>

        <p className="mt-2 text-gray-500">
          Upload documents and run AI extraction to view invoice data.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg border bg-white">
      <div className="flex gap-3 border-b p-4">
        <input
          type="text"
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">Sort</option>

          <option value="amount-high">Amount High → Low</option>

          <option value="amount-low">Amount Low → High</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Invoice ID</th>

              <th className="px-4 py-3 text-left font-semibold">
                Invoice Date
              </th>

              <th className="px-4 py-3 text-left font-semibold">Customer</th>

              <th className="px-4 py-3 text-right font-semibold">
                Total Amount
              </th>

              <th className="px-4 py-3 text-right font-semibold">Tax Amount</th>

              <th className="px-4 py-3 text-center font-semibold">Items</th>
            </tr>
          </thead>

          <tbody>
            {sortedInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">{invoice.id || "-"}</td>

                <td className="px-4 py-3">{invoice.invoice_date || "-"}</td>

                <td className="px-4 py-3">{invoice.customer_id || "-"}</td>

                <td className="px-4 py-3 text-right">
                  ₹{Number(invoice.total_amount || 0).toLocaleString("en-IN")}
                </td>

                <td className="px-4 py-3 text-right">
                  ₹{Number(invoice.tax_amount || 0).toLocaleString("en-IN")}
                </td>

                <td className="px-4 py-3 text-center">
                  {invoice.items?.length || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
