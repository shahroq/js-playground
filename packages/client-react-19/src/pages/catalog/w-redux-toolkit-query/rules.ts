const requiredRule = (field: string) => `${field} is required`;
const minLengthRule = (field: string, min: number) => ({
  value: min,
  message: `${field} must be at least ${min} characters`,
});
const positiveNumberRule = (field: string) => ({
  value: 0,
  message: `${field} must be a positive number`,
});

export const rules = {
  name: {
    required: requiredRule("Name"),
    minLength: minLengthRule("Name", 3),
  },

  description: {
    required: requiredRule("Description"),
    minLength: minLengthRule("Description", 5),
  },

  price: {
    required: requiredRule("Price"),
    positiveNumber: positiveNumberRule("Price"),
  },
} as const;
