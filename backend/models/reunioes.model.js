module.exports = (sequelize, DataTypes) => {
    const Reuniao = sequelize.define("Reuniao", {
        IdReuniao: {
            primaryKey: true,
            autoincrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
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
        Criador: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            type: DataTypes.ENUM('Pendente', 'Aprovada', 'Rejeitada'),
            defaultValue: 'Pendente',
            allowNull: false
        },

    }, {
        timestamps: false,
        tableName: 'Reuniões', // Specify the table name explicitly
    });
    Reuniao.associate = (models) => {
        Reuniao.belongsTo(models.Utilizador, {
            foreignKey: 'Criador',
            as: 'utilizador'
        });
    };
    return Reuniao;
};