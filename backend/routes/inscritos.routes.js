const express = require('express');
const router = express.Router();
const inscritosController = require('../controllers/inscritos.controller.js');

// busca todos os inscritos
router.get('/', inscritosController.getAllInscritos);
// busca os inscritos pelo id da atividade
router.get('/:id', inscritosController.getInscritosByAtividadeId);
// adiciona um inscrito a uma atividade através de um ficheiro JSON que contem o id do utilizador e o id da atividade
router.post('/', inscritosController.addInscrito);
// remove um inscrito de uma atividade
router.delete('/:id', inscritosController.removeInscrito);

module.exports = router;
