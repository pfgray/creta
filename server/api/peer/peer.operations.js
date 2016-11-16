'use strict';

var _ = require('lodash');
var request = require('superagent');
var model = require('./peer.model');
var casa_config = require('../../config/casa.js');
var Q = require('q');

// Get list of things
exports.createUpdateOperation = function(req, res) {
  function returnError(err){
    console.log('error saving Peer: ', err);
    res.json(err).status(500);
  }

  //get the peer they're talking about
  model.getPeerForUser(req.user._id, req.params.peer)
    .then(peer => exports.updatePeer(peer))
    .then(() => {
      console.log("returning success?");
      res.json({success: true});
    })
    .catch(returnError);
};

var adjInTranslate = function(apps){
    console.log('translating...');
    function translateObject(object){
        for(var key in object){
            if(casa_config.uuid_human[key]){
                //check if we have a human readable string for this uuid key
                object[casa_config.uuid_human[key]] = object[key];
                delete object[key];
            }
        }
    }
    _.each(apps, function(app) {
        _.each(['use', 'require'], function(type){
            //console.log('translating... ', JSON.stringify(app));
            translateObject(app.original[type]);
            _.each(app.journal, function(journal_entry){
                translateObject(journal_entry[type]);
            });
        });
    });
    return apps;
}

var adjInSquash = function(apps){
    _.each(apps, function(app) {
        app.attributes = app.original;
        _.each(['use', 'require'], function(type){
            _.each(app.journal, function(journal_entry){
                for(var key in journal_entry[type]){
                    app.attributes[key] = journal_entry[type][key];
                }
            });
        });
    });
    return apps;
}

var adjInFilter = function(apps){
    var filteredApps = [];
    _.each(apps, function(app) {
        var appIsGood = true;
        if(app.attributes.require){
            console.log("app does have required requirements, checking now...");
            for(var key in app.attributes.require){
                console.log("checking that the app has:", key, "...");
                //does a config value exist for this key?
                var translation_understood = false;
                for(var config_key in casa_config.uuid_human){
                    if(key === casa_config.uuid_human[config_key]){
                        translation_understood = true;
                    }
                }
                if(!translation_understood){
                    appIsGood = false;
                }
            }
        }

        if(appIsGood){
            filteredApps.push(app);
        }
        //TODO: how to validate per the attribute specification?
        //TODO: how are attributes timestamps kept/stored?
    });
    return filteredApps;
}

exports.updatePeer = function(peer){
    console.log('updating peer...', peer._id);
    return requestToPromise(request.get(peer.payloadUrl))
      .then(apps => adjInTranslate(apps))
      .then(apps => adjInSquash(apps))
      .then(apps => adjInFilter(apps))
      .then(apps => Object.assign({}, peer, {
        apps: apps,
        lastUpdated: new Date()
      }))
      .then(updatedPeer => model.updatePeer(updatedPeer));
}

function requestToPromise(req){
  var deferred = Q.defer();
  req.end((err, res) => {
      if(err){
        deferred.reject(err);
      } else {
        deferred.resolve(res.body);
      }
    });
  return deferred.promise;
}
