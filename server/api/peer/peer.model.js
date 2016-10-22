var _ = require('lodash');

var Q = require('q');
var model = require('../../database/couchdb');

module.exports = {
    getPeer:function(peerId){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'view', 'casa/peersById', {key: peerId});
    },
    getPeersByUser:function(userId){
      var db = model.getDatabase();
      console.log('Getting peers for user', userId);
      return Q.ninvoke(db, 'view', 'casa/peersByUser', {key: userId});
    },
    updatePeer:function(db, peer){
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
    deletePeer:function(id){
      var db = model.getDatabase();
      return Q.ninvoke(db, 'remove', id, rev);
    }
}
