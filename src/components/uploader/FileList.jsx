export default function FileList({
  files,
  removeFile,
}) {
  if (!files.length) return null;

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3">
        Uploaded Files
      </h3>

      <div className="space-y-3">
        {files.map((fileData) => (
          <div
            key={fileData.file.name}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <div>
              <p className="font-medium">
                {fileData.file.name}
              </p>

              <p className="text-sm text-gray-500">
                {fileData.category}
              </p>
            </div>

            <button
              onClick={() =>
                removeFile(
                  fileData.file.name
                )
              }
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}