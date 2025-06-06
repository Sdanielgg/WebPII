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
      unique: true,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.ENUM('administrador', 'Membros do Concelho', 'coordenador', 'secretariado', 'Utilizador'),
      defaultValue: 'Utilizador',
    },
    
  },{
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
  };
  
  return Utilizador;
};
// This code defines a Sequelize model for a "Utilizador" (User) entity in a database.
// It includes fields for user ID, username, email, password, role (cargo) and medalhas.