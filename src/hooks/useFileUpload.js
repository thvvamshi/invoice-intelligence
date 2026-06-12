import { useState } from "react";

export default function useFileUpload() {
  const [files, setFiles] = useState([]);

  const addFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileName) => {
    setFiles((prev) =>
      prev.filter((file) => file.name !== fileName)
    );
  };

  return {
    files,
    addFiles,
    removeFile,
  };
}