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
          as: 'utilizador',
          attributes: ['IdUtilizador', 'nomeUtilizador', 'email']
        }
      ]
    });

    res.status(200).json(inscritos);
  } catch (err) {
    next(err);
  }
};

const getAllInscritos = async (req, res) => {
  try {
    const inscritos = await Inscritos.findAll(
      {
        include: [
          {
            model: db.Utilizador,
            as: 'utilizador', 
            attributes: ['IdUtilizador', 'nomeUtilizador', 'email']
          },
          {
            model: db.Atividades, 
            as: 'atividades',
            attributes: ['titulo']
          }
        ]
      }
    );
    res.status(200).json(inscritos);
  } catch (error) {
    console.error('Erro ao buscar inscritos:', error);
    res.status(500).json({ error: 'Erro ao buscar inscritos' });
  }
};

module.exports = {
    getInscritosByAtividadeId,
    getAllInscritos
}