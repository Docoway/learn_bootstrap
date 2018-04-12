/*
var fs = require('fs');
//var re = /[>\(0-9a-zA-Z\s\:)]+[REF]/;
fs.readFile('E:\\ensembl\\genome_sequence\\genome_sequence\\1.txt',function(err,data){
    if(err) console.log(err);
    else console.log((data.toString()).slice(11869,12227));
});
*/

/*
var s = '>1 dna:chromosome chromosome:GRCh38:1:1:248956422:1 REF  NNNNNNNNNNNNNNNNMMMMMMMMMMMMMMMMAAAAAAAAAAAA111';
var re = /[>\(0-9a-zA-Z\s\:)]+[REF]/;
console.log(s.match(re));
*/

/*
var fs = require("fs");

fs.readFile('E:\\ensembl\\annotation.csv', function (err, data) {
    var table = new Array();
    if (err) {
        console.log(err.stack);
        return;
    }

    ConvertToTable(data, function (table) {
        console.log(table);
        fs.writeFile('C:\\Users\\Docosky\\Desktop\\text1.txt',table);
    })
});
console.log("程序执行完毕");

function ConvertToTable(data, callBack) {
    data = data.toString();
    var table = new Array();
    var rows = new Array();
    rows = data.split("\n");
    console.log(rows[0]);
    for (var i = 0; i < rows.length; i++) {
        table.push(rows[i].split(","));
    }
    callBack(table);
}
*/
/*
var fs = require('fs');
fs.readFile('E:\\ensembl\\annotation.txt', function (err, result) {
    if (err) {
        console.log(err.stack);
        return;
    }else
        {
            var result = result.toString();
            var rows = new Array();
            rows = result.split("\n");
            console.log(rows[0]);
            for (var i = 0; i < rows.length; i++) {
                //table.push(rows[i].split(","));
                var row = rows[i].split(",");
                if(row[1] == 'exon'){

                }
            }
        }
        callBack(table);
    }

*/

/*
var fs = require('fs');
fs.readFile('E:\\ensembl\\5_flanking_region.txt', function (err, result) {
    if (err) {
        console.log(err.stack);
        return;
    }else
    {
        var result = result.toString();
        console.log(result);
        var result1 = result.replace(/,/g,'\t');
        fs.writeFile('E:\\ensembl\\5_flanking_region2.txt',result1);
    }
});
*/



var mysql = require('mysql2');
var $conf = require('../conf/config');
var $ = require('stringformat');
var pool = mysql.createPool($conf.getTF);
var fs = require('fs');

fs.readFile('E:/ensembl/genome_sequence/genome_sequence/1.txt',function(err,data){
//注意自执行函数
    for(var id=41403;id < 41406;id++) {
        (function (lockedID) {
            var strSql = $("select chr,start,end from genegettf.gene_seq where table_id='{0}'", lockedID);
            pool.getConnection(function (err, connection) {
                connection.query(strSql, function (err, result) {
                    var s = result[0].start - 1;
                    var e = result[0].end - 1;
                    var sequence = (data.toString()).slice(s, e);
                    var sequence1 = sequence.replace(/\n/g, '');
                    sequence1 = sequence1.toLowerCase();
                    console.log(sequence1);

                    console.log(lockedID);
                    var strSql1 = $("UPDATE gene_seq SET sequence = '{0}' WHERE table_id = '{1}'", sequence1,lockedID);
                    console.log(strSql1);
                    connection.query(strSql1, function (err, result1) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result1);
                        }
                        connection.release();
                    })
                });

            });
        }(id));
    }
});


/*
var mysql = require('mysql2');
var $conf = require('../conf/config');
var $ = require('stringformat');
var pool = mysql.createPool($conf.getTF);
var term = 'PSTPIP2';
var strSql = $("SELECT seq FROM genegettf.annotation WHERE gene = '{0}'",term);
pool.getConnection(function(err,connection){
    connection.query(strSql,function(err,result){
        if(err) console.log(err);
        console.log(result);
        connection.release();
    });
});

*/