'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database/couchdb');

var storefrontModel = require('../storefronts/storefront.model');
var peerModel = require('../peer/peer.model');

var appModel = {
    getApplicationsForUser: function(userId){
      console.log('getting apps for user...', userId);
      // todo apps query
      return peerModel.getPeersByUser(userId)
      .then(function(peers){
        var result = _(peers).map(function(peer){
          return peer.apps || [];
        }).flatten().value();
        return result;
      });
    },
    getApplicationsForStorefront: function(storefrontId){
      return storefrontModel.getStorefront(db, storefrontId)
      .then(storefront => {
        console.log('getting apps... for storefront');
        return appModel.getApplicationsForUser(storefront.userId)
      });
    }
}

module.exports = appModel;
