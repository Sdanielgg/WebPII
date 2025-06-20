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
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    responsavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilizadores',
        key: 'IdUtilizador'
      }
    },
    estado: {
      type: DataTypes.ENUM('Proposta','Por Realizar', 'Realizada'),
      defaultValue: 'Por Realizar',
      allowNull: false
    },
  }, {
    tableName: 'Atividades',
    timestamps: false
  });

  Atividades.associate = (models) => {
    Atividades.hasMany(models.Fotos, {
      foreignKey: 'IdAtividade',
      as: 'fotos'
    });
    Atividades.hasMany(models.Inscritos, {
      foreignKey: 'IdAtividade',
      as: 'inscritos'
    });
    Atividades.belongsTo(models.Utilizador, {
      foreignKey: 'responsavel',
      as: 'utilizador'
    });

  };
  return Atividades;
};