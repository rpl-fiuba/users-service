const resolveDbHost = () => {
  const { DOCKER } = process.env;
  return DOCKER ? 'users-db' : 'localhost';
};

module.exports = {
  app: {
    protocol: 'http',
    hostname: 'localhost',
    port: '7000'
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
    client_id: '1065733320727-893uf4dhps0dr2nrui3l1sdkidq321l7.apps.googleusercontent.com'
  }
};
