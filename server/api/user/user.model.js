'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database');
var couchModel = require('../../database/couchdb');
var keyGenerator = require('../key/key.generator.js');

var collection = 'users';

module.exports = {
    findOrCreate:function(identifier, user, callback){
        console.log('Finding a user for identifier: ', identifier);
        model.getDatabase()
        .then(function(db){
          //users
          db.collection(collection).findOne({
            googleId:identifier.googleId
          }, function(err, u){
            if(u === null){
              var newUser = _.merge(user, identifier);
              console.log('creating user... ', JSON.stringify(newUser));
              db.collection(collection).insertMany([user], function(err, res){
                console.log('created user... ', JSON.stringify(res));
                callback(err, res);
              });
            } else {
              callback(null, u);
            }
          });
        });
    },
    getUserByEmail: function(email){
      console.log('finding user...', email);
      var db = couchModel.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/usersByEmail', email)
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
      var db = couchModel.getDatabase();
      return Q.ninvoke(db, 'save', _.merge(user, {type:'user'}))
        .then(function(result){
          console.log('created user: ', result);
          return _.merge(user, {
            _id: result.id
          });
        });
    }
};
