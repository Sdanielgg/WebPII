const db = require('../models/db.js'); // Import the database connection
const Atividade = db.Atividade; // Import the Atividade model from the database connection

const { Op } = require('sequelize'); // necessary operators for Sequelize 

const { ErrorHandler } = require("../utils/error.js"); // Import the ErrorHandler class for error handling

// list all atividades with pagination and filtering
let getAllAtividades = async (req, res, next) => {
    try {
        const { title, published, sort, order, page = 1, limit = 10 } = req.query;
        // filtering by title and published status
        const where = {};
        if (published !== undefined) {
            if (published !== 'true' && published !== 'false') 
                throw new ErrorHandler(400, `Invalid value for published: ${published}. It should be either 'true' or 'false'.`);
            where.published = published === 'true';
        }
        if (title) where.title = { [Op.like]: `%${title}%` };

        if (sort && sort !== 'views') 
           throw new ErrorHandler(400, `Invalid value for sort: ${sort}. It should be 'views'.`);
           
        if (order && order !== 'asc' && order !== 'desc') 
           throw new ErrorHandler(400, `Invalid value for order: ${order}. It should be either 'asc' or 'desc'.`);

        if ((sort && !order) || (!sort && order)) 
            throw new ErrorHandler(400, `Both sort and order must be provided together.`);

        const sortField = sort === 'views' ? 'views' : 'id';
        const sortOrder = order === 'desc' ? 'DESC' : 'ASC';

        if (isNaN(page) || page < 1) 
            throw new ErrorHandler(400, `Invalid value for page: ${page}. It should be a positive integer.`);
        
        if (isNaN(limit) || limit < 1) 
            throw new ErrorHandler(400, `Invalid value for limit: ${limit}. It should be a positive integer.`);

        let atividades = await Atividade.findAndCountAll({
            where,
            order: [[sortField, sortOrder]],
            limit: +limit,
            offset: (+page - 1) * +limit,
            raw: true
        })

        atividades.rows.forEach(atividade => {
            atividade.links = [
                { rel: "self", href: `/atividades/${atividade.id}`, method: "GET" },
                { rel: "delete", href: `/atividades/${atividade.id}`, method: "DELETE" },
                { rel: "modify", href: `/atividades/${atividade.id}`, method: "PUT" },
                { rel: "add-tags", href: `/atividades/${atividade.id}/tags`, method: "POST" },
            ]
        });

        return res.status(200).json({
            totalPages: Math.ceil(atividades.count / limit),
            currentPage: page ? page : 0,
            total: atividades.count,
            data: atividades.rows,
            links: [
                { "rel": "add-atividade", "href": `/atividades`, "method": "POST" },
                ...(page > 1 ? [{ "rel": "previous-page", "href": `/atividades?limit=${limit}&page=${page - 1}`, "method": "GET" }] : []),
                ...(atividades.count > page * limit ? [{ "rel": "next-page", "href": `/atividades?limit=${limit}&page=${+page + 1}`, "method": "GET" }] : [])
            ]
        });
    }
    catch (err) {
        next(err);
    }
}

let getAtividadeById = async (req, res, next) => {
    try {
        let atividade = await Atividade.findByPk(req.params.id, {
            attributes: { exclude: ['author'] },
            include: [
                {
                    model: db.User,
                    as: 'creator',
                    attributes: ['id', 'username']
                },
                {
                    model: db.Tag,
                    through: { attributes: [] }
                }
            ],
        });

        if (!atividade) 
            throw new ErrorHandler(404, `Cannot find any ATIVIDADE with ID ${req.params.id}.`);

        atividade = atividade.toJSON();
        atividade.Tags = atividade.Tags.map(tag => tag.name);

        atividade.links = [
            { rel: "modify", href: `/atividades/${atividade.id}`, method: "PUT" },
            { rel: "delete", href: `/atividades/${atividade.id}`, method: "DELETE" },
            ...atividade.Tags.map(tag => ({ rel: `delete-tag-${tag}`, href: `/atividades/${atividade.id}/tags/${tag}`, method: "DELETE" })),
        ]

        res.status(200).json(atividade);
    }
    catch (err) {
        next(err);
    }
}

let addAtividade = async (req, res, next) => {
    try {
        if (req.body.author === undefined) {
            let error = new Error(`Missing required field: author.`);
            error.statusCode = 400;
            return next(error);
        }

        const author = await db.User.findByPk(req.body.author);
        if (author === null) 
            throw new ErrorHandler(404, `Cannot find any USER with ID ${req.body.author}.`);

        const atividade = await Atividade.create(req.body);
        res.status(201).json({
            msg: "Atividade successfully created.",
            links: [
                { rel: "self", href: `/atividades/${atividade.id}`, method: "GET" },
                { rel: "delete", href: `/atividades/${atividade.id}`, method: "DELETE" },
                { rel: "modify", href: `/atividades/${atividade.id}`, method: "PUT" },
                { rel: "add-tags", href: `/atividades/${atividade.id}/tags`, method: "POST" },
            ]
        });
    } catch (err) {
        next(err);
    }
}

let updateAtividade = async (req, res, next) => {
    try {
        let missingFields = [];
        if (req.body.title === undefined) missingFields.push('title');
        if (req.body.description === undefined) missingFields.push('description');

        if (missingFields.length > 0) 
           throw new ErrorHandler(400, `Missing required fields: ${missingFields.join(', ')}`);

        const atividade = await Atividade.findByPk(req.params.id);
        if (!atividade) 
            throw new ErrorHandler(404, `Cannot find any ATIVIDADE with ID ${req.params.id}.`);

        await atividade.update(req.body);
        res.status(204).json();
    }
    catch (err) {
        next(err);
    }
}

let deleteAtividade = async (req, res, next) => {
    try {
        let result = await Atividade.destroy({ where: { id: req.params.id } });
        if (result == 0) 
           throw new ErrorHandler(404, `Cannot find any ATIVIDADE with ID ${req.params.id}.`);
        res.status(204).json();
    }
    catch (err) {
        next(err);
    }
}

let addTagToAtividade = async (req, res, next) => {
    try {
        const atividade = await Atividade.findByPk(req.params.id);
        if (!atividade) 
            throw new ErrorHandler(404, `Cannot find any ATIVIDADE with ID ${req.params.id}.`);

        let tag = await db.Tag.findByPk(req.params.tag);
        if (tag === null) 
            throw new ErrorHandler(404, `Cannot find any TAG ${req.params.tag}.`);

        let result = await atividade.addTag(tag);

        if (result == undefined) 
            throw new ErrorHandler(409, `Atividade ${req.params.id} already has tag ${req.params.tag}.`);

        res.json({
            msg: `Tag ${req.params.tag} successfully added to Atividade ${req.params.id}!`
        });

    } catch (err) {
        next(err);
    }
}

let deleteTagFromAtividade = async (req, res, next) => {
    try {
        const atividade = await Atividade.findByPk(req.params.id);
        if (!atividade) 
           throw new ErrorHandler(404, `Cannot find any ATIVIDADE with ID ${req.params.id}.`);

        let tag = await db.Tag.findByPk(req.params.tag);
        if (tag === null) 
            throw new ErrorHandler(404, `Cannot find any TAG ${req.params.tag}.`);

        let result = await atividade.removeTag(tag);
        if (result == 0) 
            throw new ErrorHandler(409, `Atividade ${req.params.id} does not have tag ${req.params.tag}.`);

        res.json({
            msg: `Tag ${req.params.tag} successfully removed from Atividade ${req.params.id}!`
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
  getAllAtividades, getAtividadeById,
  addAtividade, updateAtividade, deleteAtividade,
  addTagToAtividade, deleteTagFromAtividade
}
