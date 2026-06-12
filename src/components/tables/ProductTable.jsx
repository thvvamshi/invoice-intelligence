import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProductTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const products = useSelector((state) => state.products);

  const filteredProducts = products.filter(
    (product) =>
      product.id?.toLowerCase().includes(search.toLowerCase()) ||
      product.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "price-high":
      sortedProducts.sort((a, b) => (b.unit_price || 0) - (a.unit_price || 0));
      break;

    case "price-low":
      sortedProducts.sort((a, b) => (a.unit_price || 0) - (b.unit_price || 0));
      break;

    default:
      break;
  }

  if (!products.length) {
    return (
      <div className="mt-4 rounded-lg border bg-white p-8 text-center">
        <h3 className="text-lg font-semibold">No Products Found</h3>

        <p className="mt-2 text-gray-500">
          Upload documents and run AI extraction to view product data.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg border bg-white">
      <div className="flex gap-3 border-b p-4">
        <input
          type="text"
          placeholder="Search products..."
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

          <option value="price-high">Price High → Low</option>

          <option value="price-low">Price Low → High</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Product ID</th>

              <th className="px-4 py-3 text-left font-semibold">
                Product Name
              </th>

              <th className="px-4 py-3 text-center font-semibold">Quantity</th>

              <th className="px-4 py-3 text-right font-semibold">Unit Price</th>

              <th className="px-4 py-3 text-center font-semibold">Tax %</th>
            </tr>
          </thead>

          <tbody>
            {sortedProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">{product.id || "-"}</td>

                <td className="px-4 py-3">{product.name || "-"}</td>

                <td className="px-4 py-3 text-center">
                  {product.quantity || 0}
                </td>

                <td className="px-4 py-3 text-right">
                  ₹{Number(product.unit_price || 0).toLocaleString("en-IN")}
                </td>

                <td className="px-4 py-3 text-center">
                  {product.tax_percentage || 0}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
