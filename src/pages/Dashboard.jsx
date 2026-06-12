import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import TabNavigation from "../components/layout/TabNavigation";

import InvoiceTable from "../components/tables/InvoiceTable";
import ProductTable from "../components/tables/ProductTable";
import CustomerTable from "../components/tables/CustomerTable";

import useFileUpload from "../hooks/useFileUpload";

import FileUploader from "../components/uploader/FileUploader";
import FileList from "../components/uploader/FileList";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Invoices");

  const { files, addFiles, removeFile } = useFileUpload();

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
      <FileUploader addFiles={addFiles} />

      <FileList
        files={files}
        removeFile={removeFile}
      />

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {renderTab()}
    </MainLayout>
  );
}