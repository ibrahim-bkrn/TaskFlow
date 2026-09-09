const db = require('../Models/bdd');

function getAllProjects(callback) {
    const sql = "SELECT * FROM projets";

    db.query(sql,(err,results) =>{
        callback(err,results);
    });
}

function getProjectsbyid(id,callback){
    const sql = "SELECT * FROM projets where id_projet = ?";

    db.query(sql,[id],(err,results)=>{
        callback(err,results);
    });
}

function createProjets(Titre,desc_,dateCreation,statut,id_user,callback){
    const sql = "INSERT INTO projets (Titre, desc_, dateCreation, statut,id_user) VALUES (?,?,?,?,?)";

    db.query(sql,[Titre,desc_,dateCreation,statut,id_user],(err,results) => {
        callback(err,results);
    });
}

function deleteProjets(id,callback){
    const deleteTachesSql = "DELETE FROM Taches where id_projet = ?";
    const deleteProjetSql = "DELETE FROM projets where id_projet = ?";

    db.query(deleteTachesSql,[id],(err) =>{
        if (err) {
            return callback(err);
        }

        db.query(deleteProjetSql,[id],(err,resultat) =>{
            callback(err,resultat);
        });
    });
}

function updateProjet(id,Titre,desc_,dateCreation,statut, callback){
    const sql = "UPDATE projets set Titre = ?,desc_ = ?,dateCreation = ?,statut = ? where id_projet = ? "

    db.query(sql,[Titre,desc_,dateCreation,statut,id],(err) =>{
        callback(err);
    })
}



module.exports = {
    getAllProjects,
    getProjectsbyid,
    createProjets,
    deleteProjets,
    updateProjet
};