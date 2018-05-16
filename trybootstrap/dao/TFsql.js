var TFsql = {

    getgenerecommend: "select promoter_id from genetotf.EPDgene where promoter_id like '{0}%'",
    getpromoterInfo: "select promoter_id,chr,direction,pro_start,pro_end,promoter from genetotf.EPDgene where promoter_id = '{0}'",
    getTFsinfo: "select TFs from genetotf.EPDgene where promoter_id = '{0}'",
};

module.exports = TFsql;