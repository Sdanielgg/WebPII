const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

// Rota protegida — só acedes se estiveres autenticado
router.get('/privado', authenticate, (req, res) => {
  res.json({
    message: `Bem-vindo, ${req.user.email}. Estás autenticado como ${req.user.role}`
  });
});
// router.get("/",)
module.exports = router;
