var mysql = require("mysql2");
var TFsql = require("./TFsql");
//var pmkbsql = require("./pmkbsql");
var $ = require("stringformat");
var $conf = require("../conf/db");
var $util = require("../util/util");
var pool = mysql.createPool($util.extend({},$conf.genetotf));
var pool2 = mysql.createPool($util.extend({},$conf.pmkb));

var jsonWrite = function(res,ret){
    if(typeof ret == "undefined"){
        res.json({
            code: "1",
            message: "error"
        });
    }else{
        res.json(ret);
    }
};

module.exports = {

    getgenerecommend: function(req,res,next){
        var term = req.body.term;
        var Strsql = $(TFsql.getgenerecommend,term);
        pool.getConnection(function(err,connection){
            connection.query(Strsql,function(err,result){
                jsonWrite(res,result);
                connection.release();
            })
        })
    },

    getgeneinfo: function(req,res,next){
        var term = req.body.term;
        var arr = term.split("_");
        var Strsql = $("select entrez_id,Gene_Symbol,HGNC_id,synonyms,chromosome_band,type_of_gene,description from medicine_database.geneinfo_ncbihgnc where Gene_Symbol = '{0}' ",arr[0]);
        pool2.getConnection(function(err,connection){
            if(err){
                console.log(err);
            }else{
                connection.query(Strsql,function(err,result){
                    jsonWrite(res,result);
                    connection.release();
                })
            }
        })
    },

    getGeneInfo: function(req,res,next){
        var term = req.params.term;
        var arr = term.split("_");
        var Strsql = $("select entrez_id,Gene_Symbol,HGNC_id,synonyms,chromosome_band,type_of_gene,description from medicine_database.geneinfo_ncbihgnc where Gene_Symbol = '{0}' ",arr[0]);
        pool2.getConnection(function(err,connection){
            if(err){
                console.log(err);
            }else {
                connection.query(Strsql, function (err, result) {
                    res.render("TFinfo3", {GeneInfo: result, promoter_id: term});
                    connection.release();
                })
            }
        })
    },

    getpromoter: function(req,res,next){
        var term = req.body.term;
        var Strsql = $(TFsql.getpromoterInfo,term);
        pool.getConnection(function(err,connection){
            connection.query(Strsql,function(err,result){
                jsonWrite(res,result);
                connection.release();
            })
        })
    },

    getTFs: function(req,res,next){
        var term = req.body.term;
        var Strsql = $(TFsql.getTFsinfo,term);
        pool.getConnection(function(err,connection){
            connection.query(Strsql,function(err,result){
                jsonWrite(res,result);
                connection.release();
            })
        })
    }
};