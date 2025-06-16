const db = require('../models/db.js'); // Import the database connection
const User = db.Utilizador; // Import the User model from the database connection

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        // Encriptar password antes de guardar
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const user = await User.create(req.body);
        res.status(201).json({
            msg: "User successfully created.",
            userId: user.id
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

        // Hash the password if it's being updated
        if (req.body.password) {
  
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }

        await user.update(req.body);

        res.status(200).json({
            msg: "User successfully updated.",
            userId: user.id,
            user: user
        });

    } catch (err) {
        next(err);
    }
};


let removeUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            throw new ErrorHandler(404, `Cannot find any USER with ID ${req.params.id}.`);
        }

        await user.destroy();
        res.status(200).send({
            msg: `User with ID${user.id} successfully deleted.`,
        });
    } catch (err) {
        next(err);
    }
}



const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        console.log("Password recebida:", password);

        if (!user) {
            return res.status(401).json({ error: 'Email incorreto' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password do user:", user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Password incorreta' });
        }

        const token = jwt.sign(
            { id: user.get("IdUtilizador"), email: user.email, cargo: user.cargo },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
            user: {
                id: user.IdUtilizador,
                nome: user.nomeUtilizador,
                email: user.email,
                cargo: user.cargo
            }
        });

    } catch (err) {
        next(err);
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    getUsersByCargo,
    addUser,
    updateUser,
    removeUser,
    loginUser
};
