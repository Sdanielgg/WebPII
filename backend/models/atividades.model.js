module.exports = (sequelize, DataTypes) => {
  const Atividades = sequelize.define('Atividades', {
    IdAtividade: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo:{
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
    descrição: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    responsavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilizadors',
        key: 'ID_Utilizador'
      }
    },
    inscritos: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Inscritos deve ser um número positivo."
        }
      }
    }
  }, {
    tableName: 'Atividades',
    timestamps: false
  });

  return Atividades;
};
