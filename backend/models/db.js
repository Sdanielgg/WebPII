const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Testa a conexão
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('❌ Erro ao conectar com o banco de dados:', error);
        process.exit(1);
    }
})();

const db = {};
db.sequelize = sequelize;

// Carregar modelos
db.Atividades = require('./atividades.model.js')(sequelize, Sequelize.DataTypes);
db.Utilizadors = require('./utilizador.model.js')(sequelize, Sequelize.DataTypes);
db.Reuniao = require('./reuniao.model.js')(sequelize, Sequelize.DataTypes);


// Associações

// 1:N → Um utilizador tem várias atividades
db.Utilizadors.hasMany(db.Atividades, {
    foreignKey: 'author',
    onDelete: 'CASCADE',
    allowNull: false
});

db.Atividades.belongsTo(db.Utilizadors, {
    foreignKey: 'author',
    as: 'autor',
    onDelete: 'CASCADE',
    allowNull: false
});

// N:N → Uma atividade pode estar em várias reuniões e vice-versa
db.Atividades.belongsToMany(db.Reuniao, {
    through: db.AtividadeReuniao,
    foreignKey: 'atividadeId',
    otherKey: 'reuniaoName',
    timestamps: false
});

db.Reuniao.belongsToMany(db.Atividades, {
    through: db.AtividadeReuniao,
    foreignKey: 'reuniaoName',
    otherKey: 'atividadeId',
    timestamps: false
});

// Sincroniza as tabelas
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("✅ Tabelas sincronizadas com sucesso.");
    })
    .catch((err) => {
        console.error("❌ Erro ao sincronizar as tabelas:", err);
    });

module.exports = db;
