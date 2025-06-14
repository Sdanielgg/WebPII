const express = require('express');
const router = express.Router();

const verifyToken = require('../utils/auth');
const utilizadoresController = require('../controllers/utilizador.controller.js');


router.post('/login', utilizadoresController.loginUser);


router.get('/', utilizadoresController.getAllUsers);
router.get('/:id', utilizadoresController.getUserById);
router.get('/cargo/:cargo', utilizadoresController.getUsersByCargo);
router.post('/', utilizadoresController.addUser);
router.put('/:id', utilizadoresController.updateUser);
router.delete('/:id', utilizadoresController.removeUser);

// Esta rota só pode ser acedida por quem tiver um token JWT válido
router.get('/privado', verifyToken, (req, res) => {
  res.json({
    message: `Bem-vindo, utilizador com cargo ${req.user.cargo}. Estás autenticado.`,
    user: req.user
  });
});




module.exports = router;
