const db = require('../models/db.js');
const Inscritos = db.Inscritos; // Import the Inscrito model from the database connection

const { ErrorHandler } = require("../utils/error.js"); // Import the ErrorHandler class

// List all inscritos por reuniao
let getInscritosByAtividadeId = async (req, res, next) => {
  try {
    const inscritos = await db.Inscritos.findAll({
      where: { IdAtividade: req.params.id },
      include: [
        {
          model: db.Utilizador, 
          attributes: ['IdUtilizador', 'nomeUtilizador', 'email']
        }
      ]
    });

    res.status(200).json(inscritos);
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getInscritosByAtividadeId
}