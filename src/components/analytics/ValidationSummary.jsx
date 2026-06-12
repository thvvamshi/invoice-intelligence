import { useSelector } from "react-redux";

export default function ValidationSummary() {
  const customers = useSelector((state) => state.customers);

  const products = useSelector((state) => state.products);

  const invoices = useSelector((state) => state.invoices);

  const missingPhones = customers.filter((customer) => !customer.phone).length;

  const missingGstin = customers.filter((customer) => !customer.gstin).length;

  const missingProductNames = products.filter(
    (product) => !product.name,
  ).length;

  const missingInvoiceDates = invoices.filter(
    (invoice) => !invoice.invoice_date,
  ).length;

  const totalIssues =
    missingPhones + missingGstin + missingProductNames + missingInvoiceDates;

  const validations = [
    {
      label: "Missing Phones",
      value: missingPhones,
    },
    {
      label: "Missing GSTIN",
      value: missingGstin,
    },
    {
      label: "Missing Product Names",
      value: missingProductNames,
    },
    {
      label: "Missing Invoice Dates",
      value: missingInvoiceDates,
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Validation Summary</h3>

          <p className="mt-1 text-sm text-gray-500">
            Review missing or incomplete extracted fields.
          </p>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            totalIssues === 0
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {totalIssues === 0 ? "All Valid" : `${totalIssues} Issues`}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {validations.map((item) => (
          <div
            key={item.label}
            className={`rounded-lg border p-4 ${
              item.value > 0
                ? "border-red-200 bg-red-50"
                : "border-green-200 bg-green-50"
            }`}
          >
            <p className="text-sm text-gray-500">{item.label}</p>

            <p
              className={`mt-2 text-2xl font-bold ${
                item.value > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {totalIssues === 0 && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-green-700">
          All extracted records passed validation checks.
        </div>
      )}
    </div>
  );
}
