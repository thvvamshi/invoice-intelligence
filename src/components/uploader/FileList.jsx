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

      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <span>{file.name}</span>

            <button
              onClick={() =>
                removeFile(file.name)
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