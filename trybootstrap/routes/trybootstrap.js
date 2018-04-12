var express = require('express');
var bootstraprouter = express.Router();

bootstraprouter.get('/',function(req,res,next){
    res.render('trybootstrap',{title: 'Try Bootstrap'});
});

module.exports = bootstraprouter;