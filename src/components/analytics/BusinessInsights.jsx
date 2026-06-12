import { useSelector } from "react-redux";

export default function BusinessInsights() {
  const invoices = useSelector((state) => state.invoices);

  const products = useSelector((state) => state.products);

  const customerTotals = {};

  invoices.forEach((invoice) => {
    const customer = invoice.customer_id || "Unknown";

    customerTotals[customer] =
      (customerTotals[customer] || 0) + Number(invoice.total_amount || 0);
  });

  const topCustomer = Object.entries(customerTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const topProduct = [...products].sort(
    (a, b) => (b.quantity || 0) - (a.quantity || 0),
  )[0];

  const recentInvoices = [...invoices].slice(-5).reverse();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <h3 className="font-semibold mb-3">Top Customer</h3>

          {topCustomer ? (
            <>
              <p className="text-xl font-bold">{topCustomer[0]}</p>

              <p className="text-gray-500">
                ₹{topCustomer[1].toLocaleString("en-IN")}
              </p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h3 className="font-semibold mb-3">Top Product</h3>

          {topProduct ? (
            <>
              <p className="text-xl font-bold">{topProduct.name}</p>

              <p className="text-gray-500">
                Quantity: {topProduct.quantity || 0}
              </p>
            </>
          ) : (
            <p className="text-gray-500">No data available yet</p>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h3 className="font-semibold mb-4">Recent Activity</h3>

        {recentInvoices.length ? (
          <div className="space-y-2">
            {recentInvoices.map((invoice) => (
              <div
                key={`${invoice.id}-${invoice.invoice_date}`}
                className="flex justify-between border-b pb-2"
              >
                <span>{invoice.id}</span>

                <span>
                  ₹{Number(invoice.total_amount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No invoice activity available</p>
        )}
      </div>
    </div>
  );
}
