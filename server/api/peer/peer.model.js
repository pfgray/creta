var _ = require('lodash');

var Q = require('q');
var mongodb = require('mongodb');
var model = require('../../database');
var couchModel = require('../../database/couchdb');
var collection = 'peers';

module.exports = {
    getPeer:function(db, peerId){
      return Q.ninvoke(db.collection(collection), 'findOne', {
        _id: new mongodb.ObjectID(peerId)
      });
    },
    getPeersByUser:function(userId){
      var db = couchModel.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/peersByUser', userId)
        .then(peers => peers.map(p => p));
    },
    updatePeer:function(db, peer){
      console.log("saving peer:", peer);
      return Q.ninvoke(db.collection(collection), 'save', peer);
    },
    createPeer: function(peer){
      var db = couchModel.getDatabase();
      return Q.ninvoke(db, 'save', _.merge(peer, {type:'peer'}))
        .then(function(result){
          console.log('created peer: ', result);
          return _.merge(peer, {
            _id: result.id
          });
        });
    },
    deletePeer:function(db, id){
      return Q.ninvoke(db.collection(collection), 'remove', {
        _id: new mongodb.ObjectID(id)
      });
    }
}
