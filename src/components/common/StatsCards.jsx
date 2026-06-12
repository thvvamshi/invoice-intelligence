import { useSelector } from "react-redux";

export default function StatsCards() {
  const invoices = useSelector(
    (state) => state.invoices
  );

  const totalRevenue = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.total_amount || 0),
    0
  );

  const totalTax = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.tax_amount || 0),
    0
  );

  const averageInvoiceValue =
    invoices.length > 0
      ? totalRevenue / invoices.length
      : 0;

  const cards = [
    {
      title: "Invoices",
      value: invoices.length,
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString(
        "en-IN"
      )}`,
    },
    {
      title: "Tax Collected",
      value: `₹${totalTax.toLocaleString(
        "en-IN"
      )}`,
    },
    {
      title: "Average Invoice",
      value: `₹${averageInvoiceValue.toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 0,
        }
      )}`,
    },
  ];

  return (
    <div className="mb-4 mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}