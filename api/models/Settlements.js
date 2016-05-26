/**
 * Settlements.js
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

        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },

        date: {
            type: Sequelize.DATE,
            required: true,
            allowNull: false
        },

        referenceNumber: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true
        },

        description: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        }

    }

};
