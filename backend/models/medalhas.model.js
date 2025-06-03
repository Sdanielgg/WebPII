module.exports = (sequelize, DataTypes) => {
  const Medalhas = sequelize.define("Medalhas", {
    IdUtilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Utilizador",
        key: "IdUtilizador"
      },
      onDelete: "CASCADE"
    },
    ID_Atividade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Atividades",
        key: "IdAtividade"
      },
      onDelete: "CASCADE"
    },
  }, {
    timestamps: false,
    tableName: "Inscritos"
  });

  return Inscritos;
};
