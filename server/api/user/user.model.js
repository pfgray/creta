'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database/couchdb');
var keyGenerator = require('../key/key.generator.js');

module.exports = {
    getUserByEmail: function(email){
      console.log('finding user...', email);
      var db = model.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/usersByEmail', { key: email })
        .then(function(users){
          if(users.length > 0){
            return users[0].value;
          } else {
            return null;
          }
        }, function(err){
          console.log('ERR:', err);
        }).catch(err => console.log('errroro: ', err));
    },
    createUser: function(user){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'save', _.merge(user, {type:'user'}))
        .then(function(result){
          console.log('created user: ', result);
          return _.merge(user, {
            _id: result.id
          });
        });
    }
};
