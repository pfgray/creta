var _ = require('lodash');

var Q = require('q');
var model = require('../../database/couchdb');
var randomstring = require("randomstring");

module.exports = {
    getStorefront:function(db, storefrontId){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/storefronts');
    },
    getStorefrontsByUser:function(userId){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/storefrontsByUserId', {
        key: userId
      });
    },
    updateStorefront:function(db, storefront){
      console.log("saving storefront:", storefront);
      return Q.ninvoke(db.collection(collection), 'save', storefront);
    },
    createStorefront:function(storefront){
      var db = model.getDatabase();
      // initiate this storefront with one keypair
      storefront.keypairs = [{
        key: randomstring.generate(),
        secret: randomstring.generate()
      }];
      return Q.ninvoke(db, 'save', storefront);
    },
    deletePeer:function(id, rev){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'remove', id, rev);
    }
}
