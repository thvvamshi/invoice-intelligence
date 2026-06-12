const tabs = [
  "Invoices",
  "Products",
  "Customers",
];

export default function TabNavigation({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="flex gap-3 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg border transition ${
            activeTab === tab
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}