import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import TabNavigation from "../components/layout/TabNavigation";

import InvoiceTable from "../components/tables/InvoiceTable";
import ProductTable from "../components/tables/ProductTable";
import CustomerTable from "../components/tables/CustomerTable";

import useFileUpload from "../hooks/useFileUpload";

import FileUploader from "../components/uploader/FileUploader";
import FileList from "../components/uploader/FileList";

import { processWithAI } from "../services/aiExtraction.service";

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

  const handleTestExtraction = async () => {
    for (const fileData of files) {
      try {
        const result = await processWithAI(fileData);

        console.log("FILE:", fileData.file.name);

        console.log("CATEGORY:", fileData.category);

        console.log("AI RESULT:", result);
      } catch (error) {
        console.error("Extraction failed:", error);
      }
    }
  };

  return (
    <MainLayout>
      <FileUploader addFiles={addFiles} />

      <FileList files={files} removeFile={removeFile} />

      <button
        onClick={handleTestExtraction}
        className="mt-2 mb-3 px-4 py-2 rounded-lg bg-black text-white"
      >
        Run AI Extraction
      </button>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {renderTab()}
    </MainLayout>
  );
}
