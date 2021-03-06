/**
 * Modules.js
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
        name: {
            type: Sequelize.STRING,
            required: true
        },
        path: {
            type: Sequelize.STRING,
            required: false
        },
        controller: {
            type: Sequelize.STRING,
            required: true
        },
        action: {
            type: Sequelize.STRING,
            required: true
        }
    }
};
