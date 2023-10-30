module.exports = {
  app: {
    protocol: 'http',
    hostname: 'localhost',
    port: process.env.PORT || '7001'
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
    client_id: '335642806033-84755oo8q5bgurnq79rtog88njbatobd.apps.googleusercontent.com'
  }
};
