const createError = require('http-errors');
const { google } = require('googleapis');
const config = require('../config.js');

const { OAuth2 } = google.auth;

const authenticate = async ({ context }) => {
  console.log('Context for auth is', context);
  const { token } = context;
  const oauth2Client = new OAuth2();


  try {
    const response = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: config().google.client_id
    });
    return {
      email: response.payload.email,
      id: response.payload.sub,
      picture: response.payload.picture
    };
  } catch (err) {
    console.log('Got error in googleClient.js', err);
    const message = (err.errors && err.errors[0] && err.errors[0].message)
      || (err.response && err.response.statusText) || 'Unknown error';
    return Promise.reject(createError(parseInt(err.code, 10), message));
  }
};

module.exports = {
  authenticate
};
