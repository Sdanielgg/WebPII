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

// IMPORTAÇÃO DOS MODELS
const Utilizador = require('./utilizador.model')(sequelize, DataTypes);
const Atividades = require('./atividades.model')(sequelize, DataTypes);
const Fotos = require('./fotos.model')(sequelize, DataTypes);
const Inscritos = require('./inscritos.model')(sequelize, DataTypes);
const Medalhas = require('./medalhas.model')(sequelize, DataTypes);
const Reuniao = require('./reunioes.model')(sequelize, DataTypes);

// CRIAR OBJETO DB
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


Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Tabelas recriadas com sucesso.');
  })
  .catch(err => {
    console.error('❌ Erro ao criar as tabelas:', err);
  });

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();



module.exports = db;