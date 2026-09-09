const express = require("express");
const app = express();

const projetController = require("./projetController");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Views/accueil.html');
});
app.get("/projets", projetController.getAllProjects);
app.get("/projets/:id", projetController.getProjectsbyid);
app.post("/projets", projetController.createProjets);
app.put("/projets/:id", projetController.updateProjet);
app.delete("/projets/:id", projetController.deleteProjets);

// Taches