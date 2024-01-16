const express = require('express');

const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const configs = require('./config')();
const errorMiddleware = require('./middlewares/errorMiddleware');
const initialMiddleware = require('./middlewares/initialMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const requestLoggerMiddleware = require('./middlewares/requestLoggerMiddleware');

const statusController = require('./controllers/statusController');
const usersController = require('./controllers/usersController');

const app = express();
const { port } = configs.app;


app.use(cors());

//  Body parser middleware
app.use(bodyParser.json());

app.use(requestLoggerMiddleware);

// Routes
router.get('/ping', (req, res) => {
  console.log('Got call on /ping, will call ping controller');
  return statusController.ping(req, res);
});

router.get('/users-service/ping', (req, res) => {
  console.log('Got call on users-service/ping, will call ping controller');
  return statusController.ping(req, res);
});


router.use(initialMiddleware);
router.use(authMiddleware);

// Users
router.get('/login', usersController.login);
router.post('/signup', usersController.signup);
router.get('/users/:userId/profile', usersController.getUser);
router.post('/users/profile', usersController.getUsersAsBulk);

app.use(router);

app.use(errorMiddleware);

//  Setting the invalid enpoint message for any other route
app.get('*', (req, res) => {
  res.status(400).json({ message: 'Invalid endpoint' });
});

//  Start server on port
const server = app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

module.exports = {
  server
};
