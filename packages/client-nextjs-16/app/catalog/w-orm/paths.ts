export const paths = {
  catalog() {
    return `/catalog/w-orm`;
  },
  productList(productSlug: string) {
    return `/catalog/w-orm/products/${productSlug}`;
  },
};
