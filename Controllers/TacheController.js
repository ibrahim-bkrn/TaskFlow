const tacheModel = require("../Models/tacheModel.js");

function getAllTaches(req, res) {
    tacheModel.getAllTask((err, results) => {
        if (err) {
            return console.log("impossible de recuperer les taches", err);
        }
        res.json(results);
    });
}

function getTacheById(req, res) {
    const id = req.params.id;
    tacheModel.getTaskById(id, (err, results) => {
        if (err) {
            return console.log("impossible de recuperer la tache", err);
        }
        res.json(results);
    });
}

function createTache(req, res) {
    const body = req.body;

    tacheModel.insertTask(
        body.Titre,
        body.Description,
        body.dateLimite,
        body.Priorite,
        body.Statut,
        body.id_projet,
        body.id_user,
        (err) => {
            if (err) {
                return console.log("impossible de creer la tache", err);
            }
            res.json({ message: "La tache a bien été ajoutée" });
        }
    );
}

function updateTache(req, res) {
    const id = req.params.id;
    const body = req.body;

    tacheModel.updateProjet(id, body.champ, body.valeur, (err) => {
        if (err) {
            return console.log("impossible d'update la tache", err);
        }
        res.json({ message: "La tache a bien été modifiée" });
    });
}

function deleteTache(req, res) {
    const id = req.params.id;
    tacheModel.deleteProjets(id, (err) => {
        if (err) {
            return console.log("impossible de supprimer la tache", err);
        }
        res.json({ message: "La tache a bien été supprimée" });
    });
}

module.exports = {
    getAllTaches,
    getTacheById,
    createTache,
    updateTache,
    deleteTache
};
