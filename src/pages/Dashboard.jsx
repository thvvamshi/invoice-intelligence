import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import TabNavigation from "../components/layout/TabNavigation";

import InvoiceTable from "../components/tables/InvoiceTable";
import ProductTable from "../components/tables/ProductTable";
import CustomerTable from "../components/tables/CustomerTable";

export default function Dashboard() {
  const [activeTab, setActiveTab] =
    useState("Invoices");

  const renderTab = () => {
    switch (activeTab) {
      case "Products":
        return <ProductTable />;

      case "Customers":
        return <CustomerTable />;

      default:
        return <InvoiceTable />;
    }
  };

  return (
    <MainLayout>
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {renderTab()}
    </MainLayout>
  );
}