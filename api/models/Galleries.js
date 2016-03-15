/**
 * Galleries.js
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
        url: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            defaultValue: 'image',
        }
    },
    associations: function() {
        Galleries.belongsTo(Merchants, {
            foreignKey: {
                name: 'merchantId',
                allowNull: false,
            }
        });
    }
};