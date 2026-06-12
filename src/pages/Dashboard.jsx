import { useState } from "react";

import { useDispatch } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import TabNavigation from "../components/layout/TabNavigation";

import InvoiceTable from "../components/tables/InvoiceTable";
import ProductTable from "../components/tables/ProductTable";
import CustomerTable from "../components/tables/CustomerTable";

import useFileUpload from "../hooks/useFileUpload";

import FileUploader from "../components/uploader/FileUploader";
import FileList from "../components/uploader/FileList";

import { setInvoices } from "../redux/invoiceSlice";
import { setProducts } from "../redux/productSlice";
import { setCustomers } from "../redux/customerSlice";

import { processWithAI } from "../services/aiExtraction.service";

import { deduplicateById } from "../utils/deduplicate";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Invoices");

  const dispatch = useDispatch();

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
    try {
      const allInvoices = [];
      const allProducts = [];
      const allCustomers = [];

      for (const fileData of files) {
        const result = await processWithAI(fileData);

        if (!result) continue;

        allInvoices.push(...(result.invoices || []));

        allProducts.push(...(result.products || []));

        allCustomers.push(...(result.customers || []));
      }

      dispatch(setInvoices(deduplicateById(allInvoices)));

      dispatch(setProducts(deduplicateById(allProducts)));

      dispatch(setCustomers(deduplicateById(allCustomers)));

      console.log("Merged Results", {
        invoices: deduplicateById(allInvoices),
        products: deduplicateById(allProducts),
        customers: deduplicateById(allCustomers),
      });
    } catch (error) {
      console.error("Extraction failed:", error);
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
