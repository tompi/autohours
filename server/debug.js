var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var stays;

MongoClient.connect('mongodb://127.0.0.1:27017/hours', function(err, db) {
  if(err) throw err;

  stays = db.collection('stays');
  var year = '2015';
  var month = '1';
  stays.find({ $and: [{month}, {year}]}).toArray(function(err, items) {
    if(err) throw err;
    console.log(items);
  });
});
