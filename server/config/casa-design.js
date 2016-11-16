module.exports = {
   _id:"_design/casa",
   language:"javascript",
   lists: {
   },
   views:{
      applications: {
          map: function(doc){
            if(doc.type != null && doc.type == 'peer'){
              for(var i=0; i<doc.apps.length; i++){
                emit(doc.apps[i].identity, doc.apps[i]);
              }
            }
          },
          reduce: function(key, values) {
            var latest = 0;
            var latest_index = 0;
            for(var i=0; i<values.length; i++){
              if((new Date(values[i].attributes.timestamp)).getTime() > latest){
                latest = (new Date(values[i].attributes.timestamp)).getTime();
                latest_index = i;
              }
            }
            return values[latest_index];
          }
      },
      applicationsByUser: {
          map: function(doc){
            if(doc.type != null && doc.type == 'peer'){
              for(var i=0; i<doc.apps.length; i++){
                emit([doc.userId, doc.apps[i].identity], doc.apps[i]);
              }
            }
          },
          reduce: function (keys, values) {
            var latest = 0;
            var latest_index = 0;
            for(var i=0; i<values.length; i++){
              if((new Date(values[i].attributes.timestamp)).getTime() > latest){
                latest = (new Date(values[i].attributes.timestamp)).getTime();
                latest_index = i;
              }
            }
            return values[latest_index];
          }
      },
      peers: {
          map: function(doc){
            if(doc.type != null && doc.type == 'peer'){
              var appCount;
              if(doc.apps){
                appCount = doc.apps.length;
              } else {
                appCount = 0;
              }
              emit(doc._id, {
                "_id": doc._id,
                "_rev": doc._rev,
                "name": doc.name,
                "payloadUrl": doc.payloadUrl,
                "type": doc.type,
                "lastUpdated": doc.lastUpdated,
                "apps": doc.apps,
                "appCount": appCount
              })
            }
          }
      },
      peersByUser: {
          map: function(doc){
            if(doc.type != null && doc.type == 'peer'){
              var appCount = doc.apps ? doc.apps.length : 0;
              emit(doc.userId, {
                "_id": doc._id,
                "name": doc.name,
                "payloadUrl": doc.payloadUrl,
                "type": doc.type,
                "lastUpdated": doc.lastUpdated,
                "app_count": appCount
              });
            }
          }
      },
      peersById: {
        map: function(doc){
          if(doc.type != null && doc.type == 'peer'){
            delete doc.apps;
            emit(doc._id, doc);
          }
        }
      },
      usersByEmail: {
          map: function(doc) {
            if(doc.type != null && doc.type === 'user'){
              emit(doc.email, doc);
            }
          }
      },
      users: {
          map: function(doc){
            if(doc.type != null && doc.type === 'user'){
              emit(doc._id, doc);
            }
          }
      },
      app_tags: {
          map: function(doc){
            if(doc.type != null && doc.type == 'peer'){
              for(var i=0; i<doc.apps.length; i++){
                for(var j=0; j<doc.apps[i].attributes.use.tags.length; j++){
                  emit(doc.apps[i].attributes.use.tags[j], doc.apps[i].identity);
                }
              }
            }
          },
          reduce: function(key, values, rereduce) {
            if (rereduce) {
              return sum(values);
            } else {
              return values.length;
            }
          }
      },
      storefrontsByUserId: {
        map: function(doc){
          if(doc.type != null && doc.type == 'storefront'){
            emit(doc.userId, doc);
          }
        }
      },
      storefronts: {
        map: function(doc){
          if(doc.type != null && doc.type == 'storefront'){
            emit(doc._id, doc);
          }
        }
      },
      launchesByStorefront: {
        map: function(doc){
          if(doc.type != null && doc.type == 'storefront'){
            emit(doc._id, doc);
          }
        },
        reduce: function(keys, values, rereduce) {
          if (rereduce) {
            return sum(values);
          } else {
            return values.length;
          }
        }
      }
   }
};
