var express = require("express");
var trySVGrouter = express.Router();

trySVGrouter.get("/",function(req,res,next){
    res.render("trysvg1",{title: 'trySVG'});
});

module.exports = trySVGrouter;