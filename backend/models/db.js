// models/db.js

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Inicialização da conexão
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
    },
  }
);

// IMPORTAÇÃO DOS MODELS
const Utilizador = require('./utilizador.model')(sequelize, DataTypes);
const Atividades = require('./atividades.model')(sequelize, DataTypes);
const Fotos = require('./fotos.model')(sequelize, DataTypes);
const Inscritos = require('./inscritos.model')(sequelize, DataTypes);
const Medalhas = require('./medalhas.model')(sequelize, DataTypes);
const Reuniao = require('./reunioes.model')(sequelize, DataTypes);

// Agrupar todos os models
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

// Verifica e aplica associações se existirem
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ alter: true });
}

// Exporta sem rodar sync ou authenticate
module.exports = db;
