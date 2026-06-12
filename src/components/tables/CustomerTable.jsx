import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { exportToCsv } from "../../utils/exportCsv";
import { updateCustomer } from "../../redux/customerSlice";

export default function CustomerTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const dispatch = useDispatch();

  const customers = useSelector((state) => state.customers);
  const invoices = useSelector((state) => state.invoices);

  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (customer.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  const sortedCustomers = [...filteredCustomers];

  switch (sortBy) {
    case "name-asc":
      sortedCustomers.sort((a, b) =>
        (a.name || "").localeCompare(b.name || ""),
      );
      break;

    case "name-desc":
      sortedCustomers.sort((a, b) =>
        (b.name || "").localeCompare(a.name || ""),
      );
      break;

    default:
      break;
  }

  const getTotalPurchaseAmount = (customerId) => {
    return invoices
      .filter((invoice) => invoice.customer_id === customerId)
      .reduce((sum, invoice) => sum + Number(invoice.total_amount || 0), 0);
  };

  const exportCustomers = sortedCustomers.map((customer) => ({
    ...customer,
    total_purchase_amount: getTotalPurchaseAmount(customer.id),
  }));

  if (!customers.length) {
    return (
      <div className="mt-4 rounded-lg border bg-white p-8 text-center">
        <h3 className="text-lg font-semibold">No Customers Found</h3>

        <p className="mt-2 text-gray-500">
          Upload documents and run AI extraction to view customer data.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg border bg-white">
      <div className="flex flex-wrap gap-3 border-b p-4">
        <input
          type="text"
          placeholder="Search customers..."
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
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
        </select>

        <button
          onClick={() => exportToCsv("customers", exportCustomers)}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Customer ID</th>

              <th className="px-4 py-3 text-left font-semibold">Name</th>

              <th className="px-4 py-3 text-left font-semibold">Phone</th>

              <th className="px-4 py-3 text-left font-semibold">GSTIN</th>

              <th className="px-4 py-3 text-right font-semibold">
                Total Purchase Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedCustomers.map((customer) => (
              <tr
                key={customer.id || customer.name}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">
                  {customer.id ? (
                    customer.id
                  ) : (
                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                      Missing
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <input
                    value={customer.name || ""}
                    placeholder="Customer Name"
                    onChange={(e) =>
                      dispatch(
                        updateCustomer({
                          id: customer.id,
                          updates: {
                            name: e.target.value,
                          },
                        }),
                      )
                    }
                    className="w-full rounded border px-2 py-1"
                  />
                </td>

                <td className="px-4 py-3">
                  <input
                    value={customer.phone || ""}
                    placeholder="Phone Number"
                    onChange={(e) =>
                      dispatch(
                        updateCustomer({
                          id: customer.id,
                          updates: {
                            phone: e.target.value,
                          },
                        }),
                      )
                    }
                    className={`w-full rounded border px-2 py-1 ${
                      !customer.phone ? "border-red-300 bg-red-50" : ""
                    }`}
                  />
                </td>

                <td className="px-4 py-3">
                  <input
                    value={customer.gstin || ""}
                    placeholder="GSTIN"
                    onChange={(e) =>
                      dispatch(
                        updateCustomer({
                          id: customer.id,
                          updates: {
                            gstin: e.target.value,
                          },
                        }),
                      )
                    }
                    className={`w-full rounded border px-2 py-1 ${
                      !customer.gstin ? "border-red-300 bg-red-50" : ""
                    }`}
                  />
                </td>

                <td className="px-4 py-3 text-right font-medium">
                  ₹{getTotalPurchaseAmount(customer.id).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
