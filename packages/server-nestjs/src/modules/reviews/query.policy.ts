import { QueryPolicy } from 'src/common/query-service/types';
import { queryPolicy as defaultQueryPolicy } from 'src/common/query-service/default.query-policy';

export const queryPolicy: QueryPolicy = {
  ...defaultQueryPolicy,
  defaultLimit: 4,
  defaultOrderBy: { sort: 'id', direction: 'asc' },
  selectableFields: ['id', 'content', 'rating', 'status', 'product_id'],
  sortableFields: ['id', 'title', 'status', 'created_at'],
  filterableFields: ['id', 'product_id', 'status'],
  searchableFields: ['title'],
  expandableCollections: ['products'],
};
