export class QueryStringDto {
  include?: string;
  fields?: string[];

  page?: number;
  sort?: string; // field name
  filter?: unknown;
}
