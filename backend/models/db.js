const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');


const sequelize = new Sequelize('nome_da_base_de_dados', 'utilizador', 'senha', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false, 
});

const Utilizador = require('./utilizador.model')(sequelize, DataTypes);
const Atividades = require('./atividades.model')(sequelize, DataTypes);
const Fotos = require('./fotos.model')(sequelize, DataTypes);
const Inscritos = require('./inscritos.model')(sequelize, DataTypes);
const Medalhas = require('./medalhas.model')(sequelize, DataTypes);
const Reuniao = require('./reuniao.model')(sequelize, DataTypes);



const db = {
  sequelize,
  Sequelize,
  Utilizador,
  Atividades,
  Fotos,
  Inscritos,
  Medalhas,
  Reuniao,
};

module.exports = db;
