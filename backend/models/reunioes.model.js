module.exports = (sequelize, DataTypes) => {
    const Reuniao = sequelize.define("Reuniao", {
        IdReuniao: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },

        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: { args: [5, 100], msg: "Title must have between 5 to 100 characters." }
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
        criador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: "Utilizadores",
                key: "IdUtilizador"
            },
            onDelete: "CASCADE"
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        ata: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        estado: {
            type: DataTypes.ENUM('Pendente', 'Realizada',),
            defaultValue: 'Pendente',
            allowNull: false
        },

    }, {
        timestamps: false,
        tableName: 'Reuniões', // Specify the table name explicitly
    });
    Reuniao.associate = (models) => {
        Reuniao.belongsTo(models.Utilizador, {
            foreignKey: 'criador',
            as: 'utilizador'
        });
    };
    return Reuniao;
};