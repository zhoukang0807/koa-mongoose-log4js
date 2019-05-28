var mongoose = require('mongoose');
var logger = require('log4js').getLogger("config");
var config=require('../config/config');
mongoose.Promise = global.Promise;
var dbconnection=mongoose.connect(config.mongodb, {useNewUrlParser:true}, function (err, db) {
    if(err)
    {
        logger.error("db.connect.error!");
    }else {
        logger.info("db.connect.success!");
    }
}); 
module.exports= dbconnection;