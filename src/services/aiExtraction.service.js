import { processFile } from "./fileExtraction.service";
import { extractBusinessData } from "./gemini.service";

export const processWithAI = async (fileData) => {
  const extractedContent = await processFile(fileData);

  if (!extractedContent) {
    return null;
  }

  return await extractBusinessData(extractedContent);
};
