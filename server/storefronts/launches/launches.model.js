'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database/couchdb');
var collection = 'storefrontLaunches';

var db = model.getDatabase();

module.exports = {
  createStorefrontLaunch: function(storefrontId, launchParameters){
    var storefrontLaunch = {
      type:'storefrontLaunch',
      storefrontId: storefrontId,
      launchParameters: launchParameters,
      timestamp: new Date()
    };
    return Q.ninvoke(db, 'save', storefrontLaunch);
  },
  getTotalLaunchesForStorefronts: function(storefrontIds){
    return Q.ninvoke(db, 'view', 'casa/launchesByStorefront', {keys: storefrontIds, group: true, reduce: true})
      .then(peers => peers.map(p => p));
  }
}
