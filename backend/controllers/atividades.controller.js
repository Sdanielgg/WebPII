    const db = require('../models/db.js'); // Import the database connection
    const Atividade = db.Atividades;  // Import the Atividade model

    const { Op } = require('sequelize');
    const { ErrorHandler } = require("../utils/error.js");

    // list all atividades with pagination and filtering
    let getAllAtividades = async (req, res, next) => {
        console.log("ENTROU EM getAllAtividades");
        try {
            const { titulo, sort, order, page = 1, limit = 10 } = req.query;

            const where = {};
            if (titulo) where.titulo = { [Op.like]: `%${titulo}%` };

            if (sort || order)
                throw new ErrorHandler(400, `Sorting is not supported.`);

            if (isNaN(page) || page < 1)
                throw new ErrorHandler(400, `Invalid value for page: ${page}. It should be a positive integer.`);

            if (isNaN(limit) || limit < 1)
                throw new ErrorHandler(400, `Invalid value for limit: ${limit}. It should be a positive integer.`);

            let atividades = await Atividade.findAndCountAll({
                where,
                order: [['IdAtividade', 'ASC']],
                limit: +limit,
                offset: (+page - 1) * +limit,
                raw: true
            });

            return res.status(200).json({
                totalPages: Math.ceil(atividades.count / limit),
                currentPage: +page,
                total: atividades.count,
                data: atividades.rows,
            });
        } catch (err) {
            next(err);
        }
    };

    let getAtividadeById = async (req, res, next) => {
        try {
            let atividade = await Atividade.findByPk(req.params.id, {
                include: [
                    {
                        model: db.Utilizador,
                        as: 'utilizador',
                        attributes: ['IdUtilizador', 'nomeUtilizador', 'email']
                    }
                ],
            });

            if (!atividade)
                throw new ErrorHandler(404, `Cannot find any ATIVIDADE with ID ${req.params.id}.`);
            atividade = atividade.toJSON();
            res.status(200).json(atividade);
        } catch (err) {
            next(err);
        }
    };

    let addAtividade = async (req, res, next) => {
        try {
            if (req.body.responsavel === undefined) {
                throw new ErrorHandler(400, `Missing required field: responsavel.`);
            }

            const responsavel = await db.Utilizador.findByPk(req.body.responsavel);
            if (!responsavel)
                throw new ErrorHandler(404, `Cannot find any USER with ID ${req.body.responsavel}.`);

            const atividade = await Atividade.create(req.body);
            res.status(201).json({
                msg: "Atividade successfully created.",
            });
        } catch (err) {
            next(err);
        }
    };

    let updateAtividade = async (req, res, next) => {
        try {
            let missingFields = [];
            if (req.body.titulo === undefined) missingFields.push('titulo');
            if (req.body.descricao === undefined) missingFields.push('descricao');

            if (missingFields.length > 0)
                throw new ErrorHandler(400, `Missing required fields: ${missingFields.join(', ')}`);

            const atividade = await Atividade.findByPk(req.params.id);
            if (!atividade)
                throw new ErrorHandler(404, `Cannot find any ATIVIDADE with ID ${req.params.id}.`);

            await atividade.update(req.body);
            res.status(200).json({ msg: "Atividade atualizada com sucesso." });
        } catch (err) {
            next(err);
        }
    };

    let deleteAtividade = async (req, res, next) => {
        try {
            let result = await Atividade.destroy({ where: { IdAtividade: req.params.id } });
            res.status(200).json({msg: "Atividade removida com sucesso."});
            if (result == 0)
                throw new ErrorHandler(404, `Cannot find any ATIVIDADE with ID ${req.params.id}.`);
        } catch (err) {
            next(err);
        }
    };


    module.exports = {
        getAllAtividades, getAtividadeById,
        addAtividade, updateAtividade, deleteAtividade
    };
