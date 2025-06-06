// routes for /reunioes requests
const express = require('express');
const router = express.Router();

// include controller functions
const reunioesController = require('../controllers/reunioes.controller.js');

router.get('/', reunioesController.getAllReunioes);
router.post('/', reunioesController.addReuniao);
router.get('/:id', reunioesController.getReuniaoById);
router.delete('/:id', reunioesController.removeReuniao);
router.put('/:id', reunioesController.updateReuniao);
module.exports = router;
