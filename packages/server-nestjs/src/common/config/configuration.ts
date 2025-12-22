import { DatabaseType } from 'typeorm';
import { EnvelopeStrategy } from '../envelope/envelope.interface';

export type Env = 'development' | 'production' | 'test';

export default () => {
  return {
    env: <Env>(process.env.NODE_ENV || 'development'),
    port: <number>(process.env.PORT || 3003),
    user_id: <number>(process.env.USER_ID_TMP || 11),

    default: {
      user_id: <number>(process.env.DEFAULT_USER_ID || 1),
    },

    envelope: {
      strategy: <EnvelopeStrategy>(process.env.ENVELOPE_STRATEGY || 'jsend'),
    },

    database: {
      type: <DatabaseType>process.env.DATABASE_TYPE,
      url: <string>process.env.DATABASE_URL,
    },

    api_key: <string>process.env.API_KEY,
  };
};
