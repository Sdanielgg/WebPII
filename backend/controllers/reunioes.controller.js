const db = require('../models/db.js'); // Import the database connection
const Reuniao = db.Reuniao; // Import the Reuniao model
const Utilizador = db.Utilizador; // Import the Utilizador model

const { ErrorHandler } = require("../utils/error.js"); // Import the ErrorHandler class

// List all reunioes
let getAllReunioes = async (req, res, next) => {
    try {
        let reunioes = await Reuniao.findAll();
        if (!reunioes || reunioes.length === 0) {
            throw new ErrorHandler(404, "No reunioes found.");
        }
        reunioes = reunioes.map(reuniao => reuniao.toJSON());
        res.status(200).json({
            data: reunioes,
        });
    }
    catch (err) {
        next(err);
    }
}

// Add a new reuniao
let addReuniao = async (req, res, next) => {
    try {
        const reuniao = await Reuniao.create(req.body);
        res.status(201).json({
            msg: "Reuniao successfully created.",
            reuniaoId: reuniao.id,
        });
    } catch (err) {
        next(err);
    }
}

let removeReuniao = async (req, res, next) => {
    try {
        const reuniao = await Reuniao.findByPk(req.params.id);
        if (!reuniao) {
            throw new ErrorHandler(404, `Cannot find any REUNIAO with ID ${req.params.id}.`);
        }

        await reuniao.destroy();
        res.status(200).send({
            msg:`Reuniao with ID${reuniao.id} successfully deleted.`,
        }); 
    } catch (err) {
        next(err);
    }
}
let getReuniaoById = async (req, res, next) => {
    try {
        let reuniao = await Reuniao.findByPk(req.params.id, {
            include: [{
                model: db.Utilizador,
                as: 'utilizador', // must match the alias used in your association
                attributes: ['nomeUtilizador'] // adjust fields as needed
            }]
        });

        if (!reuniao) {
            throw new ErrorHandler(404, `Cannot find any REUNIAO with ID ${req.params.id}.`);
        } else {
            res.status(200).json(reuniao);
        }
    }
    catch (err) {
        next(err);
    }
}

let updateReuniao = async (req, res, next) => {
    try {
        const reuniao = await Reuniao.findByPk(req.params.id);
        if (!reuniao) {
            throw new ErrorHandler(404, `Cannot find any REUNIAO with ID ${req.params.id}.`);
        }

        await reuniao.update(req.body);
        res.status(200).json({
            msg: "Reuniao successfully updated.",
            reuniaoId: reuniao.id,
            reuniao: reuniao,

        });
    } catch (err) {
        next(err);
    } }


module.exports = {
    getAllReunioes,
    addReuniao,
    removeReuniao,
    getReuniaoById,
    updateReuniao
}
