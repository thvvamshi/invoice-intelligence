import { parseExcelFile } from "./excel.service";
import { parsePdfFile } from "./pdf.service";

export const processFile = async (fileData) => {
  const { file, category } = fileData;

  try {
    switch (category) {
      case "EXCEL":
        return await parseExcelFile(file);

      case "PDF":
        return await parsePdfFile(file);

      case "IMAGE":
        console.log("Image extraction not implemented yet");
        return null;

      default:
        console.warn(`Unsupported file type: ${category}`);
        return null;
    }
  } catch (error) {
    console.error(`Error processing ${file.name}:`, error);

    return null;
  }
};
