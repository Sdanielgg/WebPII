// routes for /atividades requests
const express = require('express');
const router = express.Router();

// include controller functions
const atividadesController = require('../controllers/atividades.controller.js');

router.get('/', atividadesController.getAllatividades);
router.get('/:id', atividadesController.getPostById);

router.post('/',  atividadesController.addPost);
router.put('/:id', atividadesController.updatePost);
router.delete('/:id', atividadesController.deletePost);

// NEW ROUTES FOR TAGS IN atividades
router.put('/:id/tags/:tag', atividadesController.addTagToPost); // add a tag to a post
router.delete('/:id/tags/:tag', atividadesController.deleteTagFromPost); // delete a tag from a post

module.exports = router;    