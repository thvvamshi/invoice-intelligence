import { useDropzone } from "react-dropzone";

import { ACCEPTED_FILE_TYPES } from "../../constants/fileTypes";

export default function FileUploader({
  addFiles,
}) {
  const { getRootProps, getInputProps } =
    useDropzone({
      accept: ACCEPTED_FILE_TYPES,

      multiple: true,

      onDrop: (acceptedFiles) => {
        addFiles(acceptedFiles);
      },
    });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer"
    >
      <input {...getInputProps()} />

      <h2 className="text-lg font-semibold">
        Upload Files
      </h2>

      <p className="text-gray-500 mt-2">
        Drag & Drop PDFs, Images or Excel Files
      </p>
    </div>
  );
}