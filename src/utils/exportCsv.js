import Papa from "papaparse";

export const exportToCsv = (
  filename,
  data
) => {
  if (!data?.length) return;

  const csv = Papa.unparse(data);

  const blob = new Blob(
    [csv],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    `${filename}.csv`
  );

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};