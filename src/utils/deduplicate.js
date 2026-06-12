export const deduplicateById = (
  items
) => {
  return Array.from(
    new Map(
      items.map((item) => [
        item.id,
        item,
      ])
    ).values()
  );
};