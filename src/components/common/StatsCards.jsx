import { useSelector } from "react-redux";

export default function StatsCards() {
  const invoices = useSelector(
    (state) => state.invoices
  );

  const products = useSelector(
    (state) => state.products
  );

  const customers = useSelector(
    (state) => state.customers
  );

  const totalRevenue = invoices.reduce(
    (sum, invoice) =>
      sum + Number(invoice.total_amount || 0),
    0
  );

  const cards = [
    {
      title: "Invoices",
      value: invoices.length,
    },
    {
      title: "Products",
      value: products.length,
    },
    {
      title: "Customers",
      value: customers.length,
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString(
        "en-IN"
      )}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mb-3 mt-2">
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