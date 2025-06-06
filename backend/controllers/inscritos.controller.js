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
// inscrever um utilizador numa atividade apartir do id de utilizador e id de atividade

const addInscrito = async (req, res) => {
  try {
    const { IdUtilizador, IdAtividade } = req.body;

    if (!IdUtilizador || !IdAtividade) {
      return res.status(400).json({ error: 'IdUtilizador e IdAtividade são obrigatórios' });
    }
    const inscritoExistente = await Inscritos.findOne({
      where: { IdUtilizador, IdAtividade }
    });
    if (inscritoExistente) {
      return res.status(400).json({ error: 'Utilizador já inscrito nesta atividade' });
    }
    const novoInscrito = await Inscritos.create({
      IdUtilizador,
      IdAtividade
    });

    res.status(201).json(novoInscrito);
  } catch (error) {
    console.error('Erro ao criar inscrito:', error);
    res.status(500).json({ error: 'Erro ao criar inscrito' });
  }
};

const removeInscrito = async (req, res) => {
  try {
    const { IdUtilizador, IdAtividade } = req.body;

    if (!IdUtilizador || !IdAtividade) {
      return res.status(400).json({ error: 'IdUtilizador e IdAtividade são obrigatórios' });
    }

    const inscrito = await Inscritos.findOne({
      where: { IdUtilizador, IdAtividade }
    });

    if (!inscrito) {
      return res.status(404).json({ error: 'Inscrito não encontrado' });
    }

    await inscrito.destroy();
    res.status(200).json({ message: 'Inscrito removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover inscrito:', error);
    res.status(500).json({ error: 'Erro ao remover inscrito' });
  }
};

module.exports = {
    getInscritosByAtividadeId,
    getAllInscritos,
    addInscrito,
    removeInscrito
}