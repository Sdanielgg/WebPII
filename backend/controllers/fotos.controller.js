const db = require('../models/db.js');
const { get } = require('../routes/fotos.routes.js');

const Fotos = db.Fotos; // Import the Fotos model from the database connection


// Get all fotos
let getAllFotos = async (req, res, next) => {
  try {
    const fotos = await Fotos.findAll({
      include: [
        {
          model: db.Atividades,
          as: 'atividades',
          attributes: ['IdAtividade', 'titulo']
        }
      ]
    });

    res.status(200).json(fotos);
  } catch (err) {
    next(err);
  }
}

// Get fotos by atividade ID

let getFotosByAtividadeId = async (req, res, next) => {
  try {
    const fotos = await Fotos.findAll({
      where: { IdAtividade: req.params.id },
      include: [
        {
          model: db.Atividades,
          as: 'atividades',
          attributes: ['IdAtividade', 'titulo']
        }
      ]
    });

    res.status(200).json(fotos);
  } catch (err) {
    next(err);
  }
}

// Get fotos by Id de foto

let getFotoById = async (req, res, next) => {
  try {
        const foto= await Fotos.findByPk(req.params.id, {
            include: [
                {
                    model: db.Atividades,
                    as: 'atividades',
                    attributes: ['IdAtividade', 'titulo']
                }
            ]
        });

        if (!foto) {
            return res.status(404).json({ error: 'Foto não encontrada' });
        }   
        res.status(200).json(foto);
    } catch (err) {
        next(err);
    }
}

//  adicionar foto a uma atividade
let addFoto = async (req, res, next) => {
  try {
    const { IdAtividade, url, titulo, data } = req.body;

    if (!IdAtividade || !url || !titulo || !data) {
      return res.status(400).json({ error: 'IdAtividade, url, titulo e data são obrigatórios' });
    }

    const newFoto = await Fotos.create({
      IdAtividade,
      url,
      titulo,
      data,
    });

    res.status(201).json({
      msg: "Foto adicionada com sucesso.",
      fotoId: newFoto.IdFoto,
      url: newFoto.url,
    });
  } catch (err) {
    next(err);
  }
};

let deleteFoto = async (req, res, next) => {
  try {
    const foto = await Fotos.findByPk(req.params.id);
    if (!foto) {
      return res.status(404).json({ error: 'Foto não encontrada' });
    }
    await foto.destroy();
    res.status(200).json({ msg: 'Foto removida com sucesso.' });
  } catch (err) {
    next(err);
  }
}   

module.exports={
    getAllFotos,
    getFotosByAtividadeId,
    getFotoById,
    addFoto,
    deleteFoto
}
