import { QueryPolicy } from './types';

// default query policy (to be merged in every module)
export const queryPolicy: QueryPolicy = {
  defaultLimit: 5,
  defaultOrderBy: { sort: 'id', direction: 'asc' },
  selectableFields: ['id'],
  sortableFields: ['id'],
  filterableFields: ['id'],
  searchableFields: [],
  expandableCollections: [],
};
