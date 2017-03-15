var session = require('express-session'),
    connect = require('connect');
    ConnectCouchDB = require('connect-couchdb')(session)
    couch = require('../environment').couch;

const opts = {
  // Name of the database you would like to use for sessions.
  name: 'casa-sessions',

  // Optional. Database connection details. See yacw documentation
  // for more informations
  // username: 'username',
  // password: 'password',
  host: couch.host,
  port: couch.port,

  // Optional. How often expired sessions should be cleaned up.
  // Defaults to 600000 (10 minutes).
  reapInterval: 600000,

  // Optional. How often to run DB compaction against the session
  // database. Defaults to 300000 (5 minutes).
  // To disable compaction, set compactInterval to -1
  compactInterval: 300000,

  // Optional. How many time between two identical session store
  // Defaults to 60000 (1 minute)
  setThrottle: 60000
};

var store = new ConnectCouchDB(opts);

store.setup(opts, function (err) {
  if (err) {
    console.error('Error setting up session database...');
    console.error(err);
    return;
  }
  console.log('successfully created session database.');
});

module.exports = store;
