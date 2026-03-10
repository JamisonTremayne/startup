const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const port = process.argv[2] || 4000;

app.get(/.*/, (req, res) => {
  res.json({ msg: 'Pixel Hoarder service' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});