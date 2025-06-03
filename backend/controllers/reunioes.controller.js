const db = require('../models/db.js'); // Import the database connection
const Reuniao = db.Reunioes; // Import the Reuniao model

const { ErrorHandler } = require("../utils/error.js"); // Import the ErrorHandler class

// List all reunioes
let getAllReunioes = async (req, res, next) => {
    try {
        let reunioes = await Reuniao.findAll();
        return res.status(200).json({
            data: reunioes,
            links: [
                { rel: "add-reuniao", href: `/reunioes`, method: "POST" },
            ]
        });
    }
    catch (err) {
        next(err);
    }
}

// Add a new reuniao
let addReuniao = async (req, res, next) => {
    try {
        // You may want to add validation here for required fields in req.body

        const reuniao = await Reuniao.create(req.body);
        res.status(201).json({
            msg: "Reuniao successfully created.",
            reuniaoId: reuniao.id,
            links: [
                { rel: "self", href: `/reunioes/${reuniao.id}`, method: "GET" },
                { rel: "modify", href: `/reunioes/${reuniao.id}`, method: "PUT" },
                { rel: "delete", href: `/reunioes/${reuniao.id}`, method: "DELETE" }
            ]
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllReunioes,
    addReuniao,
}
