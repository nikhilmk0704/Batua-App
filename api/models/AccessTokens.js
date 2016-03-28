/**
 * AccessTokens.js
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
        token: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
        },
        deviceId: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        deviceType: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        }
    },
    associations: function() {
        AccessTokens.belongsToMany(Users, {
            through:'UsersAccessTokens',
            foreignKey: {
                name: 'AccessTokenId',
                allowNull: false
            }
        });
        Users.belongsToMany(AccessTokens, {
            through:'UsersAccessTokens',
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });

    }
};
