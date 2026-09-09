const express = require('express');
const app = express();

app.use(express.json());
const db = require('./Models/bdd.js')


const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
}); 

app.get('/', (req, res) => {
    res.send('Bienvenue sur notre projet')
})

