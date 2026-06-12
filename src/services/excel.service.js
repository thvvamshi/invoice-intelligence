import * as XLSX from "xlsx";

export const parseExcelFile = async (
  file
) => {
  try {
    const buffer =
      await file.arrayBuffer();

    const workbook =
      XLSX.read(buffer);

    const sheetName =
      workbook.SheetNames[0];

    const worksheet =
      workbook.Sheets[sheetName];

    const jsonData =
      XLSX.utils.sheet_to_json(
        worksheet,
        {
          defval: "",
        }
      );

    return jsonData;
  } catch (error) {
    console.error(
      "Excel parsing error:",
      error
    );

    return [];
  }
};