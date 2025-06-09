const db = require('../models/db.js'); // Import the database connection
const User = db.Utilizador; // Import the User model from the database connection

const { ErrorHandler } = require("../utils/error.js"); // Import the ErrorHandler class for error handling

// GET todos os utilizadores
let getAllUsers = async (req, res, next) => {
    try {
        let users = await User.findAll();
        return res.status(200).json({
            data: users,
        });
    }
    catch (err) {
        next(err);
    }
}

let getUserById = async (req, res, next) => {
    try {
        let user = await User.findByPk(req.params.id);
        if (!user) {
            throw new ErrorHandler(404, `Cannot find any USER with ID ${req.params.id}.`);
        } else {
            user = user.toJSON();
            res.status(200).json(user);
        }
    }
    catch (err) {
        next(err);
    }
}

// GET utilizadores por cargo
const getUsersByCargo = async (req, res) => {
    const { cargo } = req.params;

    try {
        const cargosValidos = ['administrador', 'membros do concelho', 'coordenador', 'secretariado', 'utilizador'];
        if (!cargosValidos.includes(cargo)) {
            return res.status(400).json({ error: 'Cargo inválido' });
        }

        const utilizadores = await User.findAll({
            where: { cargo },
        });

        res.status(200).json(utilizadores);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar utilizadores por cargo', details: error.message });
    }
};


let addUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            msg: "User successfully created.",
            userId: user.id,
            links: [
                { rel: "self", href: `/utilizadores/${user.id}`, method: "GET" },
                { rel: "modify", href: `/utilizadores/${user.id}`, method: "PUT" },
                { rel: "delete", href: `/utilizadores/${user.id}`, method: "DELETE" }
            ]
        });
    } catch (err) {
        next(err);
    }
}


let updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            throw new ErrorHandler(404, `Cannot find any USER with ID ${req.params.id}.`);
        }

        await user.update(req.body);
        res.status(200).json({
            msg: "User successfully updated.",
            userId: user.id,
            user: user,

        });
    } catch (err) {
        next(err);
    }
}


let removeUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            throw new ErrorHandler(404, `Cannot find any USER with ID ${req.params.id}.`);
        }

        await user.destroy();
        res.status(204).send({
            msg: `User with ID${user.id} successfully deleted.`,
        });
    } catch (err) {
        next(err);
    }
}



module.exports = {
    getAllUsers, getUserById, getUsersByCargo, addUser, updateUser, removeUser
}