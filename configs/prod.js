module.exports = {
  app: {
    protocol: 'http',
    hostname: 'localhost',
    port: process.env.PORT || '7000'
  },
  db: {
    client: 'pg',
    version: '10.10',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE
    }
  },
  google: {
    client_id: '1065733320727-893uf4dhps0dr2nrui3l1sdkidq321l7.apps.googleusercontent.com'
  }
};
