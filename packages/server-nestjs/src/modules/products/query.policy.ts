import { QueryPolicy } from 'src/common/query-service/types';
import { queryPolicy as defaultQueryPolicy } from 'src/common/query-service/default.query-policy';

export const queryPolicy: QueryPolicy = {
  ...defaultQueryPolicy,
  defaultLimit: 3,
  defaultOrderBy: { sort: 'id', direction: 'asc' },
  selectableFields: ['id', 'name', 'category', 'price', 'in_stock'],
  sortableFields: ['id', 'name', 'price', 'created_at'],
  filterableFields: ['id', 'name', 'category', 'price', 'in_stock'],
  searchableFields: ['name', 'description'],
  expandableCollections: ['reviews'],
};
