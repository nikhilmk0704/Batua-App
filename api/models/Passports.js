/**
 * Passports.js
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
        password: {
            type: Sequelize.STRING,
        },
        pin: {
            type: Sequelize.INTEGER(4),
        },
        isPinActivated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        smsOtp: {
            type: Sequelize.STRING(8),
            defaultValue: null,
        },
        emailOtp: {
            type: Sequelize.STRING(8),
            defaultValue: null,
        }
    }
};
