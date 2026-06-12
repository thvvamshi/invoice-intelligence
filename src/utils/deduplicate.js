export const deduplicateById = (items) => {
  const map = new Map();

  items.forEach((item, index) => {
    const key =
      item.id && item.id.trim() !== ""
        ? item.id
        : `${item.name || "item"}-${index}`;

    map.set(key, item);
  });

  return Array.from(map.values());
};