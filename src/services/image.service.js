export const parseImageFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result.split(",")[1];

      resolve({
        mimeType: file.type,
        data: base64,
      });
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};