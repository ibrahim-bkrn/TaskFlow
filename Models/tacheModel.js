const db = require('./bdd.js');

function getAllTask (callback) {
    const request = "SELECT * FROM Taches;";

    db.query(request, (err, results) => {
        callback(err, results);
    });
}

module.exports = {getAllTask};