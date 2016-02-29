var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var stays;

MongoClient.connect('mongodb://127.0.0.1:27017/hours', function(err, db) {
  if(err) throw err;

  stays = db.collection('stays');
});

module.exports = {
  getStays: function(year, month, next) {
    //console.log(next);
    stays.find({$and: [{year: parseInt(year)}, {month: parseInt(month)}]}).toArray(function(err, items) {
      if(err) throw err;
      next(items);
    });
  }
};
