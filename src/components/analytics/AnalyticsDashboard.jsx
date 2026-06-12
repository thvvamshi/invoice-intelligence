import StatsCards from "../common/StatsCards";

export default function AnalyticsDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Business insights generated from extracted invoice data.
        </p>
      </div>

      <StatsCards />
    </div>
  );
}