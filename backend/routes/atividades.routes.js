// routes for /atividades requests
const express = require('express');
const router = express.Router();

// include controller functions
const atividadesController = require('../controllers/atividades.controller.js');

router.get('/', atividadesController.getAllAtividades);
router.get('/:id', atividadesController.getAtividadeById);

router.post('/', atividadesController.addAtividade);
router.put('/:id', atividadesController.updateAtividade);
router.delete('/:id', atividadesController.deleteAtividade);

// NEW ROUTES FOR TAGS IN atividades
router.post('/:id/tags/:tag', atividadesController.addTagToAtividade); // add a tag to an atividade
router.delete('/:id/tags/:tag', atividadesController.deleteTagFromAtividade); // delete a tag from an atividade

module.exports = router;
