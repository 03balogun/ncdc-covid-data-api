const environments = {};

environments.development = {
  port: process.env.PORT || 8000,
  envName: 'development',
  dbUrl: process.env.DATABASE_SERVER
};

environments.production = {
  port: process.env.PORT || process.env.PROD_PORT,
  envName: 'production',
  dbUrl: process.env.DATABASE_SERVER
};

const currentEnvironment = typeof process.env.NODE_ENV === 'string'
  ? process.env.NODE_ENV.toLowerCase() : '';

const environmentToExport = typeof
(environments[currentEnvironment]) === 'object'
  ? environments[currentEnvironment]
  : environments.development;

module.exports = environmentToExport;
