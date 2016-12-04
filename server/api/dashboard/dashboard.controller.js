'use strict';

var _ = require('lodash');
var Q = require('q');
var appsModel = require('../application/application.model');
var peersModel = require('../peer/peer.model');
var storefrontModel = require('../storefronts/storefront.model.js');
var launchesModel = require('../../storefronts/launches/launches.model.js');

var rethrow = err => {throw err};

// Get the dashboard
exports.index = function(req, res) {
    if(!req.user){
      res.status(403).json({
        error: "Missing Authentication"
      }
    );
      return;
    }
    var user = req.user._id;

    Q.all([
      appsModel.getApplicationsForUser(user),
      peersModel.getPeersByUser(user),
      storefrontModel.getStorefrontsByUser(user)
    ])
      .then(([apps, peers, storefronts]) => {
        console.log("Resolved all promises:");
        console.log("  apps:", apps);
        console.log("  peers:", peers);
        console.log("  storefronts:", storefronts);

        const ids = storefronts.map(s => s._id);
        return launchesModel.getTotalLaunchesForStorefronts(ids)
          .then(launchCounts => {
            storefronts.map(store => {
              var foundStore = _.find(launchCounts, function(launch) {
                return launch._id === store._id;
              });
              store.launchCount = foundStore ? foundStore.count : 0;
            });
            res.status(200).json({
              apps,
              peers,
              storefronts
            });
          });
      }, rethrow)
      .catch(function(err){
        console.log('error getting apps: ', err);
        res.status(500).json({
            status: 'error',
            message: err
        });
      });
};
