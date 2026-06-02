export type RHFValidationAdapter<T> = {
  rules?: Partial<Record<keyof T, RegisterOptions<T>>>;
  resolver?: Resolver<T>;
};
