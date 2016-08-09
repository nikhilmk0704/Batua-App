/**
 * UsersPaymentmodes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        default: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        balance: {
            type: Sequelize.FLOAT,
            defaultValue:0
        }
    }
};
