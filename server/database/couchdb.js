'use strict';

var jf = require('jsonfile');
var util = require('util');
var cradle = require('cradle');
var couch = require('../config/environment').couch;

var casa_design = require('../config/casa-design.js');

module.exports = {
  init: function(config){
    console.log('initing database...', couch);

    var c =  new(cradle.Connection)(couch.host, couch.port, {
        cache: true,
        raw: false,
        forceSave: true
    });
    var db = c.database(config.couch.db_name);
    var updateDesign = function(design){
        db.save(design._id, design);
    }
    db.exists(function (err, exists) {
      if (err) {
        console.log('could not determine if database: <' + config.couch.db_name + '> exists, ', err);
      } else if (exists) {
        console.log('database: <' + config.couch.db_name + '> already exists');
        updateDesign(casa_design);
      } else {
        console.log('database does not exists.');
        db.create(function(err){
            // do something if there's an error
            if(!err){
            updateDesign(casa_design);
            console.log('database <' + config.couch.db_name + '> created successfully');
            // populate design documents
            } else {
            console.log('Error creating database: ' + config.couch.db_name + '...', err);
            }
        });
      }
    });
  },
  getDatabase: function(){
    var c =  new(cradle.Connection)(couch.host, couch.port, {
        cache: true,
        raw: false,
        forceSave: true
    });
    return c.database(couch.db_name);
  },
  extractOne: id => resp => {
    var message = id ? ' (with id: ' + id + ')' : '';
    if(!resp[0]){
      throw new Error("Expected exactly one item" + message + ", but none found.");
    } else if (resp[1]) {
      throw new Error("Expected exactly one item" + message + ", but multiple found.");
    } else {
      return resp[0].value;
    }
  }
}
