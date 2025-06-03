module.exports = (sequelize, DataTypes) => {
   const Fotos = sequelize.define("Fotos", {
       Id: {
           primaryKey: true,
           type: DataTypes.STRING,
       },
       id: {
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
   }, {
       timestamps: false,
       tableName: 'Fotos', // Specify the table name explicitly
   });
   return Fotos;
};