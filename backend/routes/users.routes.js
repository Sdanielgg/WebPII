// const express = require('express');
// const router = express.Router();

// // include controller functions
// const usersController = require('../controllers/users.controller.js');

// // routes for /users requests
// router.get('/:id/posts', usersController.getPostsFromUser); // get all posts from a user

// module.exports = router;

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Rota protegida — só acedes se estiveres autenticado
router.get('/privado', authenticate, (req, res) => {
  res.json({
    message: `Bem-vindo, ${req.user.email}. Estás autenticado como ${req.user.role}`
  });
});

module.exports = router;
