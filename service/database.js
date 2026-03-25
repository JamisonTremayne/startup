const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('pixelhoarder');
const accountCollection = db.collection('account');
const userdataCollection = db.collection('userdata');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getAccount(userName) {
  return accountCollection.findOne({ userName: userName });
}

function getAccountByToken(token) {
  return accountCollection.findOne({ token: token });
}

async function addAccount(account) {
  await accountCollection.insertOne(account);
}

async function updateAccount(account) {
  await accountCollection.updateOne({ userName: account.userName }, { $set: account });
}

async function updateAccountRemoveAuth(account) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}