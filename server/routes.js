var db = require('./db.js');

var appRouter = function(app) {
  app.get("/api/stays", function(req, res) {
    db.getStays(req.query.year, req.query.month, function(items) {
      res.send(items);
    });
  });
}

module.exports = appRouter;
