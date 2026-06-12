import { useState } from "react";
import { classifyFiles } from "../services/fileProcessor.service";

export default function useFileUpload() {
  const [files, setFiles] = useState([]);

  const addFiles = (newFiles) => {
    const classifiedFiles = classifyFiles(newFiles);

    setFiles((prev) => [
      ...prev,
      ...classifiedFiles,
    ]);
  };

  const removeFile = (fileName) => {
    setFiles((prev) =>
      prev.filter(
        ({ file }) => file.name !== fileName
      )
    );
  };

  return {
    files,
    addFiles,
    removeFile,
  };
}