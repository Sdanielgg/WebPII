require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Connect using env vars
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// Import models
const Utilizador = require('./utilizador.model')(sequelize, DataTypes);
const Atividades = require('./atividades.model')(sequelize, DataTypes);
const Fotos = require('./fotos.model')(sequelize, DataTypes);
const Inscritos = require('./inscritos.model')(sequelize, DataTypes);
const Medalhas = require('./medalhas.model')(sequelize, DataTypes);
const Reuniao = require('./reuniao.model')(sequelize, DataTypes);

// Collect models
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

// Sync DB
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Tabelas sincronizadas com a base de dados.');
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar a base de dados:', err.message);
  });

module.exports = db;
