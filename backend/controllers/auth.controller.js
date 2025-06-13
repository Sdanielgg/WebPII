// backend/controllers/auth.controller.js
const db = require('../models/db.js'); // ligação à base de dados
const Utilizador = db.Utilizador;
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');  

// Registo de um novo usuário
exports.register = async (req, res, next) => {
    try {
        const { nomeUtilizador, email, password, cargo } = req.body;
        if (!nomeUtilizador || !email || !password) {
            return res.status(400).json({ error: "Dados incompletos" });
        }
        
        // verifica se o email já existe
        const existe = await Utilizador.findOne({ where: { email } });
        if (existe) {
            return res.status(400).json({ error: "Email já utilizado" });
        }
        
        // faz o hash da password
        const hashed = await bcrypt.hash(password, 10);
        
        // grava o usuário na base de dados
        const user = await Utilizador.create({ nomeUtilizador, email, password: hashed, cargo });

        res.status(201).json({ message: "Utilizador criado com sucesso.", id: user.IdUtilizador });

    } catch (err) {
        next(err);
    }
};

 // Autenticação (login) de um usuário
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Dados incompletos" });
        }
        
        // verifica se o usuário existe
        const user = await Utilizador.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Utilizador não encontrado" });
        }
        
        // verifica se a password corresponde
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Palavra-passe incorreta" });
        }
        
        // gera um token JWT
        const token = jwt.sign({ id: user.IdUtilizador }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login realizado com sucesso.", token });

    } catch (err) {
        next(err);
    }
};

