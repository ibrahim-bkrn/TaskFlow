const { getAllTask } = require('../Models/tacheModel.js');

getAllTask((err, result) => {
    if (err) {
        console.error("Error: ", err);
        return;
    }

    console.log("Nos tâches : ", result);
})

