const resolveDbHost = () => {
  const { DOCKER } = process.env;
  return DOCKER ? 'users-db' : 'localhost';
};

module.exports = {
  app: {
    protocol: 'http',
    hostname: 'localhost',
    port: '7001'
  },
  db: {
    client: 'pg',
    version: '10.10',
    connection: {
      host: resolveDbHost(),
      user: 'postgres',
      password: 'postgres',
      database: 'users_service'
    }
  },
  google: {
    client_id: '335642806033-84755oo8q5bgurnq79rtog88njbatobd.apps.googleusercontent.com'
  }
};
