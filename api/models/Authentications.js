/**
 * Authentications.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        isEmailVerified: {
            type: Sequelize.BOOLEAN,
            required: true,
            defaultValue: false,
            allowNull: false,
        },
        facebookId: {
            type: Sequelize.STRING,
        },
        googleId: {
            type: Sequelize.STRING,
        },
        batuaId: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
        },
    },
    associations: function() {
        Authentications.belongsTo(Passports, {
            foreignKey: {
                name: 'passportId',
                allowNull: false,
            }
        });
        AccessTokens.belongsTo(Authentications, {
            foreignKey: {
                name: 'authenticationId',
                allowNull: false,
            }
        });
    }
};
