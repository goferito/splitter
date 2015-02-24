
/*
 * Create the basic functions that controllers normally
 * implement.
 * The function created here can still be overwritten on 
 * each controller.
 */

var config = require('../config')
  , db = require('../helpers/db')
  

module.exports = function(objects){
  var me = {};

  me.loadLast = function(req, res, next){
    if(!req.out) req.out = {};

    db[objects]
      .find({}, {}, {sort: {_id: -1}, limit: config.pageLength})
      .toArray(function(err, docs){
        if(err) return next(err);
        req.out[objects] = docs;
        next();
      });
  };

  me.renderList = function(req, res){
    res.render(objects, req.out);
  };
  
  return me;
};
