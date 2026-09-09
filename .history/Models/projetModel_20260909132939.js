const db = require('../Models/bdd');

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

function createProjets(Titre,desc_,dateCreation,statut, callback){
    const sql = "INSERT INTO projets (Titre, desc_, dateCreation, statut) VALUES (?,?,?,?)";

    db.query(sql,[Titre,desc_,dateCreation,statut],(err,results) => {
        callback(err,results);
    });
}

function deleteProjets(id,callback){
    const sql = "DELETE FROM projet where id_projet = ?";

    db.query(sql,[id],(err,resultat) =>{
        callback(err,resultat);
    });
}

function updateProjet(id,Titre,desc_,dateCreation,statut, callback){
    const sql = "UPDATE projet set Titre = ?,desc_ = ?,dateCreation = ?,statut = ? where id_projet = ? "

    db.query(sql,[Titre,desc_,dateCreation,statut,id],(err,results) =>{
        callback(err,results);
    })
}



module.exports = {
    getAllProjects,
    getProjectsbyid,
    createProjets,
    deleteProjets,
    updateProjet
};