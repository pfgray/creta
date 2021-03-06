
var passport = require('passport');
var Q = require('q');
var userModel = require('../../api/user/user.model.js');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcrypt');
var invitations = require('../../components/invitations');

module.exports = function(app, config){
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: true
  },
  function(req, email, password, done) {
      console.log('Checking local user... ', email, password);
      userModel.getUserByEmail(email).then(user => {
        console.log('hm, got back:', user);
        if(!user) {
          done({err: 'MissingUser'}, false);
        } else {
          compare(password, user.password)
            .then(success => {
              if(success){
                done(null, user);
              } else {
                done(null, false);
              }
            });
        }
      });
    }
  ));

  app.post('/api/signup', function(req, res){
    console.log('got signup request: ', req.body);
    //does there already exist a user with this email?
    userModel.getUserByEmail(req.body.email)
    .then(function(user){
      console.log('found uesr:', user);
      if(user === null){
        console.log('making user...');

        //create the user
        return prepUserForDb(req.body)
          .then(user =>
            userModel.createUser(user));
      } else {
        res.status(400).json({
          error: "A user with this email already exists."
        });
      }
    })
    //.then(user => invitations.sendInviteEmailToUser(user))
    .then(user => {
      console.log('okay, made user: ', user);
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
  });

  app.post('/api/login',
    passport.authenticate('local'),
    function(req, res) {
      // Successful authentication, redirect home.
      res.status(200).json({
        success:true
      });
    });
}

function prepUserForDb(user) {
  return hashPass(user.password)
    .then(function(hash){
      return {
        email: user.email,
        password: hash,
        pending: false
      };
    });
}

function compare(password, hashedPassword){
  return Q.ninvoke(bcrypt, 'compare', password, hashedPassword)
}

const saltRounds = 10;
function hashPass(pass){
  return Q.ninvoke(bcrypt, 'hash', pass, saltRounds);
}
