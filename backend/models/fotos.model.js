module.exports = (sequelize, DataTypes) => {
   const Fotos = sequelize.define("Fotos", {
       IdFoto: {
           primaryKey: true,
           type: DataTypes.INTEGER,
           autoIncrement: true,
       },
         IdAtividade: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: 'Atividades', 
                key: 'IdAtividade'
              },
              onDelete: 'CASCADE'
         },
       titulo: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               len: { args: [5, 100], msg: "Title must have between 5 to 50 characters." }
           }
       },
       data: {
           type: DataTypes.DATE,
           allowNull: false,
           validate: {
               isDate: true,
               notEmpty: true
           }
       },
       url: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isUrl: true,
               notEmpty: true
           }
       },
   }, {
       timestamps: false,
       tableName: 'Fotos', 
   });
   Fotos.associate = (models) => {
       Fotos.belongsTo(models.Atividades, {
              foreignKey: 'IdAtividade',
              as: 'atividades'
            });
};
            
   
   return Fotos;
};