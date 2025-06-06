const express = require('express');
const router = express.Router();
const controller = require('../controllers/atividades.controller');

// GET todas com filtros/paginação
router.get('/', controller.getAllAtividades);

// GET por ID (com User e Tags)
router.get('/:id', controller.getAtividadeById);

// POST nova
router.post('/', controller.addAtividade);

// PUT atualizar
router.put('/:id', controller.updateAtividade);

// DELETE apagar
router.delete('/:id', controller.deleteAtividade);

module.exports = router;
