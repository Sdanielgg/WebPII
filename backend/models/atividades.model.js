module.exports = (sequelize, DataTypes) => {
  const Atividades = sequelize.define('Atividades', {
    ID_Atividade: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo_Atividade: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    local_Atividade: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    data_Atividade: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descrição_Atividade: {
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
