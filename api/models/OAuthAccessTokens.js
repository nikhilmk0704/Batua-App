/**
 * Client
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessToken: {
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

        OAuthAccessTokens.belongsTo(User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });

        OAuthAccessTokens.belongsTo(OAuthClients, {
            foreignKey: {
                name: 'clientId',
                allowNull: false
            }
        });

    }
}
