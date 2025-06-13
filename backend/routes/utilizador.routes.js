const express = require('express');
const router = express.Router();

const utilizadoresController = require('../controllers/utilizador.controller.js');


// Rota protegida — só acedes se estiveres autenticado
router.get('/privado', (req, res) => {
  res.json({
    message: `Bem-vindo, ${req.user.email}. Estás autenticado como ${req.user.role}`
  });
});

router.get('/', utilizadoresController.getAllUsers);
router.get('/:id', utilizadoresController.getUserById);
router.get('/cargo/:cargo', utilizadoresController.getUsersByCargo);
router.post('/', utilizadoresController.addUser);
router.put('/:id', utilizadoresController.updateUser);
router.delete('/:id', utilizadoresController.removeUser);





module.exports = router;
