import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { exportToCsv } from "../../utils/exportCsv";
import { updateProduct } from "../../redux/productSlice";

export default function ProductTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const filteredProducts = products.filter(
    (product) =>
      (product.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (product.name || "").toLowerCase().includes(search.toLowerCase()),
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

  const exportProducts = sortedProducts.map((product) => ({
    ...product,
    price_with_tax:
      Number(product.unit_price || 0) *
      (1 + Number(product.tax_percentage || 0) / 100),
  }));

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
      <div className="flex flex-wrap gap-3 border-b p-4">
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

        <button
          onClick={() => exportToCsv("products", exportProducts)}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Product ID</th>

              <th className="px-4 py-3 text-left font-semibold">
                Product Name
              </th>

              <th className="px-4 py-3 text-center font-semibold">Quantity</th>

              <th className="px-4 py-3 text-right font-semibold">Unit Price</th>

              <th className="px-4 py-3 text-center font-semibold">Tax %</th>

              <th className="px-4 py-3 text-right font-semibold">
                Price With Tax
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedProducts.map((product) => {
              const priceWithTax =
                Number(product.unit_price || 0) *
                (1 + Number(product.tax_percentage || 0) / 100);

              return (
                <tr
                  key={
                    product.id ||
                    product.name ||
                    `${product.unit_price}-${product.quantity}`
                  }
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {product.id ? (
                      product.id
                    ) : (
                      <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                        Missing
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <input
                      value={product.name || ""}
                      placeholder="Product Name"
                      onChange={(e) =>
                        dispatch(
                          updateProduct({
                            id: product.id,
                            updates: {
                              name: e.target.value,
                            },
                          }),
                        )
                      }
                      className={`w-full rounded border px-2 py-1 ${
                        !product.name ? "border-red-300 bg-red-50" : ""
                      }`}
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      value={product.quantity || 0}
                      onChange={(e) =>
                        dispatch(
                          updateProduct({
                            id: product.id,
                            updates: {
                              quantity: Number(e.target.value),
                            },
                          }),
                        )
                      }
                      className="w-20 rounded border px-2 py-1 text-center"
                    />
                  </td>

                  <td className="px-4 py-3 text-right">
                    <input
                      type="number"
                      value={product.unit_price || 0}
                      onChange={(e) =>
                        dispatch(
                          updateProduct({
                            id: product.id,
                            updates: {
                              unit_price: Number(e.target.value),
                            },
                          }),
                        )
                      }
                      className="w-24 rounded border px-2 py-1 text-right"
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      value={product.tax_percentage || 0}
                      onChange={(e) =>
                        dispatch(
                          updateProduct({
                            id: product.id,
                            updates: {
                              tax_percentage: Number(e.target.value),
                            },
                          }),
                        )
                      }
                      className="w-20 rounded border px-2 py-1 text-center"
                    />
                  </td>

                  <td className="px-4 py-3 text-right font-medium">
                    ₹
                    {priceWithTax.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
