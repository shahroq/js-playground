import { DatabaseType } from 'typeorm';

export type Env = 'development' | 'production' | 'test';

export default () => {
  return {
    env: <Env>(process.env.NODE_ENV || 'development'),
    port: <number>(process.env.PORT || 3003),
    default_user_id: <number>(process.env.DEFAULT_USER_ID || 1),
    database_type: <DatabaseType>process.env.DATABASE_TYPE,
    database: {
      type: <DatabaseType>process.env.DATABASE_TYPE,
      url: <string>process.env.DATABASE_URL,
    },
  };
};
