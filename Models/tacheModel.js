const db = require('./bdd.js');

function getAllTask (callback) {
    const request = "SELECT * FROM Taches;";

    db.query(request, (err, results) => {
        callback(err, results);
    });
}

function getTaskById (id, callback){
    let request = "SELECT * FROM Taches where Id_Tache = ?;";

    db.query(request, [id], (err, results) => {
        callback(err, results);
    });
}

function insertTask (Titre,Description,dateLimite,Priorite,Statut,id_projet,id_user, callback){
    let request = "INSERT INTO Taches (Titre,Description,dateLimite,Priorite,Statut,id_projet,id_user) VALUES (?,?,?,?,?,?,?);"

    db.query(
        request,
        [Titre,Description,dateLimite,Priorite,Statut,id_projet,id_user, callback],
        (err)=>{callback(err)}
    )
}

function deleteProjets(id,callback){
    let request = "DELETE FROM Taches where Id_Tache = ?";

    db.query(request,[id],(err) =>{
        callback(err);
    });
}

function updateProjet(id, oldColonne, newVal, callback){
    let request = "UPDATE Taches SET ?? = ? WHERE Id_Tache = ?;"

    db.query(
        request,
        [oldColonne, newVal, id],
        (err)=>{callback(err)}
    )

}

module.exports = {
    getAllTask,
    getTaskById,
    insertTask,
    deleteProjets, 
    updateProjet
};