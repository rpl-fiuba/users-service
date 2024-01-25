const createError = require('http-errors');

const { processDbResponse, snakelize } = require('../utils/dbUtils');
const configs = require('../config')();

console.log('Config db is ', configs.db.connection.host, configs.db.connection.user, configs.db.connection.password, configs.db.connection.database);
const knex = require('knex')(configs.db); // eslint-disable-line

/**
 * Get user.
 *
 */
const getUser = async ({ userId }) => (
  knex('users')
    .select()
    .where('user_id', userId)
    .returning('*')
    .then(processDbResponse)
    .then((response) => {
      if (!response.length) {
        throw new createError.NotFound('User not found');
      }
      return response[0];
    })
);

/**
 * Get users by ids.
 *
 */
const getUsersByIds = async ({ userIds = [] }) => (
  knex('users')
    .select()
    .whereIn('user_id', userIds)
    .returning('*')
    .then(processDbResponse)
    .then((response) => {
      if (!response) {
        throw new createError.NotFound('No users found');
      }
      return response;
    })
);

/**
 * Create user.
 *
 */
const createUser = async ({ userMetadata }) => (
  knex('users')
    .insert(snakelize(userMetadata))
    .returning('*')
    .then(processDbResponse)
    .catch((err) => {
      if (err.code === '23505') {
        throw new createError.Conflict('User already exists');
      }
      throw err;
    })
);

module.exports = {
  getUser,
  getUsersByIds,
  createUser
};
