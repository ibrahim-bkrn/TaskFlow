const express = require('express');
const projetController = require('./Controllers/projetController');

const app = express();

app.use(express.json());
const db = require('./Models/bdd')


const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
}); 

app.get('/', (req, res) => {
    res.send('Bienvenue sur notre projet')
})

app.get('/projets', projetController.getAllProjects);
app.get('/projets/:id', projetController.getProjectsbyid);
app.post('/projets', projetController.createProjets);
app.put('/projets/:id', projetController.updateProjet);
app.delete('/projets/:id', projetController.deleteProjets);