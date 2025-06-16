module.exports = (sequelize, DataTypes) => {
  const Utilizador = sequelize.define('Utilizador', {
    IdUtilizador: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomeUtilizador: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.ENUM('administrador', 'membros do concelho', 'coordenador', 'secretariado', 'utilizador'),
      defaultValue: 'utilizador',
    },

  }, {
    timestamps: false,
    tableName: 'Utilizadores', // Specify the table name explicitly
  });
  Utilizador.associate = (models) => {


    Utilizador.hasMany(models.Atividades, {
      foreignKey: 'responsavel',
      as: 'atividades'
    });

    Utilizador.hasMany(models.Inscritos, {
      foreignKey: 'IdUtilizador',
      as: 'inscritos'
    });
    Utilizador.hasMany(models.Medalhas, {
      foreignKey: 'IdUtilizador',
      as: 'medalhas'
    });
    Utilizador.hasMany(models.Reuniao, {
      foreignKey: 'criador',
      as: 'reunioes'
    });
  };

  return Utilizador;
};
// This code defines a Sequelize model for a "Utilizador" (User) entity in a database.
// It includes fields for user ID, username, email, password, role (cargo) and medalhas.