module.exports = (sequelize, DataTypes) => {
const Inscritos = sequelize.define("Inscritos", {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  IdUtilizador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Utilizadores", 
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
  }
}, {
  timestamps: false,
  tableName: "Inscritos"
});
return Inscritos;
};