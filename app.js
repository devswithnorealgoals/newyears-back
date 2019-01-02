// Env variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./api');
const passport = require('passport');
const passportConfig = require('./config/passport');
// express app
const app = express();
// Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// Mongoose
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI).catch(reason => {
  console.error('Unable to connect to the mongodb instance. Error: ', reason);
});
// Passport
passportConfig.initialize(passport);
app.use(passport.initialize());
app.use(passportConfig.middleware); // protect all routes by default
// VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// API
app.use('/api/v1', api);
// Catch all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
// Error handler
app.use((err, req, res, next) => {
  console.dir(err, { depth: null });
  res.status(err.statusCode || 500).json({ message: err.message, error: err });
});
// Set app port
const port = process.env.PORT || 3000;
app.set('port', port);
// Run server
if (!module.parent) {
  // kill $(lsof - t - i: 3000) : use to kill if EADDR:3000
  app.listen(port, () => console.log(`Running on localhost:${port}`));
}

module.exports = app;
