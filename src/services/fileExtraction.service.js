import { parseExcelFile } from "./excel.service";

export const processFile =
  async (fileData) => {
    const { file, category } =
      fileData;

    switch (category) {
      case "EXCEL":
        return await parseExcelFile(
          file
        );

      default:
        return null;
    }
  };