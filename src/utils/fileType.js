export const getFileCategory = (file) => {
  const type = file.type;

  if (type.includes("pdf")) {
    return "PDF";
  }

  if (type.includes("image")) {
    return "IMAGE";
  }

  if (
    type.includes("sheet") ||
    type.includes("excel")
  ) {
    return "EXCEL";
  }

  return "UNKNOWN";
};