import { parseExcelFile } from "./excel.service";
import { parsePdfFile } from "./pdf.service";
import { parseImageFile } from "./image.service";

export const processFile = async (fileData) => {
  const { file, category } = fileData;

  try {
    switch (category) {
      case "EXCEL":
        return await parseExcelFile(file);

      case "PDF":
        return await parsePdfFile(file);

      case "IMAGE":
        return await parseImageFile(file);

      default:
        return null;
    }
  } catch (error) {
    console.error(`Error processing ${file.name}:`, error);

    return null;
  }
};
