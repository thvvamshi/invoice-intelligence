import { useState } from "react";
import { useSelector } from "react-redux";

import { exportToCsv } from "../../utils/exportCsv";

export default function CustomerTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const customers = useSelector(
    (state) => state.customers,
  );

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.id
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase()),
  );

  const sortedCustomers = [...filteredCustomers];

  switch (sortBy) {
    case "name-asc":
      sortedCustomers.sort((a, b) =>
        (a.name || "").localeCompare(
          b.name || "",
        ),
      );
      break;

    case "name-desc":
      sortedCustomers.sort((a, b) =>
        (b.name || "").localeCompare(
          a.name || "",
        ),
      );
      break;

    default:
      break;
  }

  if (!customers.length) {
    return (
      <div className="mt-4 rounded-lg border bg-white p-8 text-center">
        <h3 className="text-lg font-semibold">
          No Customers Found
        </h3>

        <p className="mt-2 text-gray-500">
          Upload documents and run AI extraction
          to view customer data.
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
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 rounded-lg border px-3 py-2"
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="rounded-lg border px-3 py-2"
        >
          <option value="">
            Sort
          </option>

          <option value="name-asc">
            Name A → Z
          </option>

          <option value="name-desc">
            Name Z → A
          </option>
        </select>

        <button
          onClick={() =>
            exportToCsv(
              "customers",
              sortedCustomers,
            )
          }
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">
                Customer ID
              </th>

              <th className="px-4 py-3 text-left font-semibold">
                Name
              </th>

              <th className="px-4 py-3 text-left font-semibold">
                Phone
              </th>

              <th className="px-4 py-3 text-left font-semibold">
                GSTIN
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedCustomers.map(
              (customer) => (
                <tr
                  key={customer.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {customer.id || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {customer.name || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {customer.phone || "-"}
                  </td>

                  <td className="px-4 py-3">
                    {customer.gstin || "-"}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}