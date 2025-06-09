const express = require('express');
const router = express.Router();
const controller = require('../controllers/fotos.controller');

// Route to get fotos by atividade ID
router.get('/', controller.getAllFotos);
// Route to get fotos by atividade ID
router.get('/:id', controller.getFotosByAtividadeId);
// Route to get foto by foto id
router.get('/foto/:id', controller.getFotoById);
// Route to add a new foto to an atividade
router.post('/', controller.addFoto);
// Route to delete a foto by foto id
router.delete('/:id', controller.deleteFoto);
module.exports = router;