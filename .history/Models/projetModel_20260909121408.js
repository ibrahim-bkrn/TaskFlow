const db = require('../config/db');

function getAllProjects(callback) {
    const sql = "SELECT * FROM projet";

    db.query(sql,(err,results) =>{
        callback(err,results);
    });
}

function getProjectsbyid(id,callback){
    const sql = "SELECT * FROM projet where id_projet = ?";

    db.query(sql,[id],(err,results)=>{
        callback(err,results);
    });
}


module.exports = {
    getAllProjects
};