var express = require("express");
var TFinfoRouter = express.Router();
var TFDao = require("../dao/TFDao");

TFinfoRouter.get("/",function(req,res,next){
    res.render("TFgene",{title: "TFgene"});
});
TFinfoRouter.get("/:term",function(req,res,next){
    TFDao.getGeneInfo(req,res,next);
});
TFinfoRouter.post("/generecommend",function(req,res,next){
    TFDao.getgenerecommend(req,res,next);
});

TFinfoRouter.post("/getpromoter",function(req,res,next){
    TFDao.getpromoter(req,res,next);
});
TFinfoRouter.post("/getTFs",function(req,res,next){
    TFDao.getTFs(req,res,next);
});



module.exports = TFinfoRouter;