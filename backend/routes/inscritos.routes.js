const express = require('express');
const router = express.Router();
const inscritosController = require('../controllers/inscritos.controller.js');


router.get('/', inscritosController.getAllInscritos);
router.get('/:id', inscritosController.getInscritosByAtividadeId);

module.exports = router;
