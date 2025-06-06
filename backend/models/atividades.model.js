module.exports = (sequelize, DataTypes) => {
  const Atividades = sequelize.define('Atividades', {
    IdAtividade: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    local: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descricao: { // corrige para o mesmo nome da BD
      type: DataTypes.TEXT,
      allowNull: false
    },
    responsavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilizadores',  //Validar se é utiliadores ou utiliador!!!!!!!!!
        key: 'IdUtilizador'
      }
    },
  }, {
    tableName: 'Atividades',
    timestamps: false
  });

  Atividades.associate = (models) => {
    Atividades.belongsTo(models.Utilizador, {
      foreignKey: 'responsavel',
      as: 'creator'
    });
  };
  return Atividades;
};