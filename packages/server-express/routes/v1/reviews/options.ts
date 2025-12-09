export const options = {
  defaultPerPage: 4,
  selectableFields: ["id", "content", "rating", "product_id"],
  defaultOrder: { sort: "id", direction: "asc" },
  allowedSortFields: ["id", "title", "created_at"],
  searchableFields: [],
  filterableFields: ["id", "product_id"],
  expandableCollections: ["products"],
};
