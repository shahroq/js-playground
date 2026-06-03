export type Error = {
  field: string;
  message: string;
};
export type FieldsErrors = Record<string, string[]>;

// General Contract: for use in custom validation or schema-based validation
export type ValidationResult<T = unknown> = {
  success: boolean;
  data?: T;
  errors: Error[] | FieldsErrors;
};

// ONLY for forms using RHF
// RHF Contract: RHF uses build-in rule validation or external validation through a `resolver`
export type RHFValidationAdapter<T> = {
  rules?: Partial<Record<keyof T, RegisterOptions<T>>>;
  resolver?: Resolver<T>;
};
