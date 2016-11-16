var _ = require('lodash');

var Q = require('q');
var model = require('../../database/couchdb');

module.exports = {
    getPeer:function(peerId){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/peersById', {key: peerId})
        .then(resp => {
          if(resp[0]){
            return resp[0].value;
          } else {
            return Q.reject("Peer with id: ", peerId, "not found.");
          }
        });
    },
    getPeerForUser:function(userId, peerId){
      return this.getPeer(peerId)
        .then(peer => {
          if(peer.userId === userId){
            return peer;
          } else {
            return Q.reject({error: "Peer doesn't belong to this user"});
          }
        })
    },
    getPeersByUser:function(userId){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/peersByUser', {key: userId})
          .then(peers => peers.toArray());
    },
    updatePeer:function(peer){
      console.log("saving peer:", peer);
      var db = model.getDatabase();
      return Q.ninvoke(db, 'save', peer._id, peer._rev, _.merge(peer, {type:'peer'}));
    },
    createPeer: function(peer){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'save', _.merge(peer, {type:'peer'}))
        .then(function(result){
          console.log('created peer: ', result);
          return _.merge(peer, {
            _id: result.id
          });
        });
    },
    deletePeer:function(id, rev){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'remove', id, rev);
    }
}
