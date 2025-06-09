module.exports = (sequelize, DataTypes) => {
  const Medalhas = sequelize.define("Medalhas", {
    IdUtilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Utilizadores",
        key: "IdUtilizador"
      },
      onDelete: "CASCADE"
    },
    nomeMedalha: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dataMedalha: {
      type: DataTypes.DATE,
      allowNull: false
    },

  }, {
    timestamps: false,
    tableName: "Medalhas"
  });
  Medalhas.associate = (models) => {
    Medalhas.belongsTo(models.Utilizador, {
      foreignKey: "IdUtilizador",
      as: "utilizador"
    });
  }
  return Medalhas;
};
