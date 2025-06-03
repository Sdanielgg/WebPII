module.exports = (sequelize, DataTypes) => {
   const Fotos = sequelize.define("Fotos", {
       Id: {
           primaryKey: true,
           type: DataTypes.STRING,
       },
       title: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               len: { args: [5, 50], msg: "Title must have between 5 to 50 characters." }
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
       tableName: 'Fotos', // Specify the table name explicitly
   });
   return Fotos;
};