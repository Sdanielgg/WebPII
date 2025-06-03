module.exports = (sequelize, DataTypes) => {
  const Inscritos = sequelize.define("Inscritos", {
    ID_Utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Utilizador",
        key: "ID_Utilizador"
      },
      onDelete: "CASCADE"
    },
    ID_Atividade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Atividades",
        key: "ID_Atividade"
      },
      onDelete: "CASCADE"
    },
  }, {
    timestamps: false,
    tableName: "Inscritos"
  });

  return Inscritos;
};
