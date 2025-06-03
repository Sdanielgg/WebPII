// routes for /reunioes requests
const express = require('express');
const router = express.Router();

// include controller functions
const reunioesController = require('../controllers/reunioes.controller.js');

router.get('/', reunioesController.getAllReunioes);
router.post('/', reunioesController.addReuniao);

module.exports = router;
