const projetModel = require("../Models/projetModel");

function getAllProjects(req,res){
    projetModel.getAllProjects((err,results)=>{
        if(err){
            return console.log("impossible de recuperer les projet",err);

        }
        res.json(results);
    });
}

function getProjectsbyid(req,res){
    const id = req.params.id;
    projetModel.getProjectsbyid(id,(err,results)=>{
        if(err){
            return console.log("impossible de recuperer les projets",err)
        }
        res.json(results);
    });
}

function createProjets(req,res){
    const body = req.body;

    projetModel.createProjets(body.Titre,body.desc_,body.dateCreation,body.statut, body.id_user, (err,results)=> {
        if(err){
            return console.log("impossible de creer le projets", err)
        }
        res.json(results);
    });
}

function updateProjet(req,res){
    const id = req.params.id;
    const body = req.body;

    projetModel.updateProjet(id,body.Titre,body.desc_,body.dateCreation,body.statut, (err,results)=>{
        if(err){
            return console.log("impossible d'update le projets", err)
        }
        res.json(results);
    });
}

function deleteProjets(req,res){
    const id = req.params.id;
    projetModel.deleteProjets(id, (err,results)=>{
        if(err){
            console.log("impossible de supprimer le projet ", err);
            return res.status(500).json({ message: "impossible de supprimer le projet" });
        }
        res.json(results);
    });
}

module.exports = {
    getAllProjects,
    getProjectsbyid,
    createProjets,
    updateProjet,
    deleteProjets
};