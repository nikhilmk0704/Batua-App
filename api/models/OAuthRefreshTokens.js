/**
 * OAuthRefreshTokens.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        refreshToken: {
            type: Sequelize.STRING,
            required: true
        },
        expires: {
            type: Sequelize.DATE,
            required: true,
            allowNull: false
        }
    },

    associations: function() {

        OAuthRefreshTokens.belongsTo(User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });

        OAuthRefreshTokens.belongsTo(OAuthClients, {
            foreignKey: {
                name: 'clientId',
                allowNull: false
            }
        });

    }
};
