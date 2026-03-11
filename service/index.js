const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

app.use(express.json());

let accounts = [];
let userdata = {};

const port = process.argv[2] || 4000;

let apiRouter = express.Router();
app.use(`/api`, apiRouter);
app.use(express.static('public'));




// CreateAuth a new account
apiRouter.post('/auth/create', async (req, res) => {
  if (await findAccount('userName', req.body.userName)) {
    res.status(409).send({ msg: 'Existing account' });
  } else {
    const account = await createAccount(req.body.userName, req.body.password, req.body.email);

    setAuthCookie(res, account.token);
    res.send({ userName: account.userName });
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

// GetGuest get guest id
apiRouter.post('/guest', (req, res) => {
  const guestId = `guest_${Math.random().toString(36).substring(2, 10)}`;

  userdata[guestId] = createUserData(guestId);

  res.json({ guestId });
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
apiRouter.get('/userdata/:username', verifyAuth, (req, res) => {
    const user = findUserData(req.params.username);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
  res.json(user);
});

// SubmitUserData
apiRouter.post('/userdata', verifyAuth, (req, res) => {
  const user = updateUserData(req.body);
  res.json(user);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


// updateUserData updates existing userData or adds it if not found
function updateUserData(newData) {
  userdata[newData.userName] = newData;
  return newData;
}

function findUserData(userName) {
    return userdata[userName];
}

async function createAccount(userName, password, email) {
  const passwordHash = await bcrypt.hash(password, 10);

  const account = {
    userName: userName,
    password: passwordHash,
    email: email,
    token: uuid.v4(),
  };
  accounts.push(account);

  return account;
}

async function findAccount(field, value) {
  if (!value) return null;

  return accounts.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});