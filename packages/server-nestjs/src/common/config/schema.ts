import Joi from 'joi';

/**
 * Config Schemas
 */
export const configSchemas = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().port().default(3002),
  DEFAULT_USER_ID: Joi.number().default(1),
});
