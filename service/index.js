const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();

app.use(express.json());

let accounts = [];
let users = [];

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv[2] || 4000;

// CreateAuth a new account
apiRouter.post('/auth/create', async (req, res) => {
  if (await findAccount('userName', req.body.email)) {
    res.status(409).send({ msg: 'Existing account' });
  } else {
    const account = await createAccount(req.body.email, req.body.password);

    setAuthCookie(res, account.token);
    res.send({ email: account.email });
  }
});

// GetAuth login an existing account
apiRouter.post('/auth/login', async (req, res) => {
  const account = await findAccount('userName', req.body.userName);
  if (account) {
    if (await bcrypt.compare(req.body.password, account.password)) {
      account.token = uuid.v4();
      setAuthCookie(res, account.token);
      res.send({ userName: account.userName });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout an account
apiRouter.delete('/auth/logout', async (req, res) => {
  const account = await findAccount('token', req.cookies[authCookieName]);
  if (account) {
    delete account.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const account = await findAccount('token', req.cookies[authCookieName]);
  if (account) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetUserData
apiRouter.get('/userdata', verifyAuth, (_req, res) => {
  res.send(userdata);
});

// SubmitUserData
apiRouter.post('/userdata', verifyAuth, (req, res) => {
  userdata = updateUserData(req.body);
  res.send(userdata);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});