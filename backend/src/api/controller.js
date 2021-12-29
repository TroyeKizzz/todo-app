const db = require("./models");
const Entry = db.entries;

// Create and Save a new Entry
exports.create = (req, res) => {
    // Validate request
    if (!req.body.tasks) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create an array of Entries
    let list = [];
    for (let i in req.body.tasks) {
        list.push({
            task: req.body.tasks[i].task,
            done: req.body.tasks[i].done
        });
    }
    const entry = new Entry({
        tasks: list
    });

    // Save Entry in the database and respond with id
    entry
        .save(entry)
        .then(data => {
            res.send(data._id);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });

};

// Find a single Entry with an id
exports.findOne = (req, res) => {

};

// Update a Entry by the id in the request
exports.update = (req, res) => {

};