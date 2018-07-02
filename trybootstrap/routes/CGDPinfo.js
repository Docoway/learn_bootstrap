var express = require("express");
var geneticdiagnosisRouter = express.Router();

geneticdiagnosisRouter.get("/",function(req,res,next){
    res.render("CGDPinfo");
});
geneticdiagnosisRouter.get("/patientInfo",function(req,res,next){
    res.render("CGDPinfo_patientInfo")
});


module.exports = geneticdiagnosisRouter;