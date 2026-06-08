import { EnvelopeStrategy } from 'src/common/envelope-service/envelope.interface';
import { DatabaseType } from 'typeorm';

export type Env = 'development' | 'production' | 'test';

export default () => {
  return {
    env: <Env>(process.env.NODE_ENV || 'development'),
    port: Number(process.env.PORT || 3003),

    default: {
      user_id: Number(process.env.DEFAULT_USER_ID || 1),
      pagination_limit: <number>(process.env.DEFAULT_PAGINATION_LIMIT || 10),
      timeout: Number(process.env.DEFAULT_TIMEOUT || 3000),
    },

    envelope: {
      strategy: <EnvelopeStrategy>(process.env.ENVELOPE_STRATEGY || 'jsend'),
    },

    database: {
      type: <DatabaseType>process.env.DATABASE_TYPE,
      url: <string>process.env.DATABASE_URL,
    },

    api_key: <string>process.env.API_KEY,

    http_client: {
      api_url_jsonplaceholder: <string>(
        process.env.HTTP_CLIENT_API_URL_JSONPLACEHOLDER
      ),
      api_url_httpbin: <string>process.env.HTTP_CLIENT_API_URL_HTTPBIN,
    },
  };
};
