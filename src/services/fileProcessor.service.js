import { getFileCategory } from "../utils/fileType";

export const classifyFiles = (files) => {
  return files.map((file) => ({
    file,
    category: getFileCategory(file),
  }));
};