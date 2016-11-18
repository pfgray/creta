var _ = require('lodash');

var Q = require('q');
var model = require('../../database/couchdb');
var randomstring = require("randomstring");

module.exports = {
    getStorefront:function(storefrontId){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/storefronts')
        .then(model.extractOne(storefrontId));
    },
    getStorefrontsByUser:function(userId){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/storefrontsByUserId', { key: userId })
      .then(stores => stores.toArray());
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
      return Q.ninvoke(db, 'save', Object.assign(storefront, {type: 'storefront'}));
    },
    deletePeer:function(id, rev){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'remove', id, rev);
    }
}
