const mysql = require('mysql2');

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "taskflow"
})

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connecté à la database")
})

module.exports = db;