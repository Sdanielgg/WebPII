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
    IdAtividade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Atividades",
        key: "IdAtividade"
      },
      onDelete: "CASCADE"
    },
    nomeMedalha:{
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dataMedalha: {
      type: DataTypes.DATE,
      allowNull: false
    },

  }, {
    timestamps: false,
    tableName: "Inscritos"
  });
    Medalhas.associate = (models) => {
      Medalhas.belongsTo(models.Utilizador, {
        foreignKey: "IdUtilizador",
        as: "utilizador"
      });

      Medalhas.belongsTo(models.Atividades, {
        foreignKey: "IdAtividade",
        as: "atividade"
      });
    }
  return Medalhas;
};
