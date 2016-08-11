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
        },
        deviceId: {
            type: Sequelize.STRING,
            defaultValue:null
        },
        deviceType: {
            type: Sequelize.STRING,
            defaultValue:null
        }
    }
};
