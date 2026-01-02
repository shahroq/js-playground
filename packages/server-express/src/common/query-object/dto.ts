export class QueryStringDto {
  include?: string;
  fields?: string[];

  page?: number;
  sort?: string; // field name
  filter?: unknown;
}

/*
  &include=reviews,users&fields=id,name,price&page[number]=1&page[size]=20&sort=-created_at,price&filter[status]=published&filter[category]=tech
 
  // line by line
  &include=reviews,users
  
  &fields=id,name,price
  
  &page[number]=1
  &page[size]=20
  
  &sort=-created_at,price
  
  &filter[status]=published
  &filter[category]=tech

  TO:
  {
  include: ["reviews"],
  fields: {
    products: ["id","name","price"],
    reviews: ["rating"]
  },
  sort: [{ field: "createdAt", direction: "desc" }, { field: "price", direction: "asc" }],
  page: { number: 1, size: 20 },
  filter: { status: "published", category: "tech" }
}
*/
