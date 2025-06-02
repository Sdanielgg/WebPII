module.exports = (sequelize, DataTypes) => {
  const Utilizador = sequelize.define('Utilizador', {
    idUtilizador: {
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
      type: DataTypes.ENUM('administrador', 'Membros do Concelho', 'coordenador', 'secretariado'),
      defaultValue: 'secretariado',
    },
    medalhas: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });

  return Utilizador;
};
// This code defines a Sequelize model for a "Utilizador" (User) entity in a database.
// It includes fields for user ID, username, email, password, role (cargo) and medalhas.