export type Crumb = {
  label: string;
  path?: string;
};

export type Page = {
  title: string;
  breadcrumb?: Crumb[];
};
