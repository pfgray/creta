'use strict';

var _ = require('lodash');
var Q = require('q');
var model = require('../../database/couchdb');

var storefrontModel = require('../storefronts/storefront.model');
var peerModel = require('../peer/peer.model');

var appModel = {
    getApplicationsForUser: function(userId){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/applicationsByUser', {group: true, reduce: true})
        .then(resp => resp.toArray());
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
