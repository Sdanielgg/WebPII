const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
require('dotenv').config();

const registerUser = async (req, res) => {
  const { nome, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      nome,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'Utilizador criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar utilizador.' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Utilizador não encontrado.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Senha incorreta.' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, nome: user.nome, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

module.exports = { registerUser, loginUser };
