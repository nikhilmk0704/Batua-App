/**
 * BankDetails.js
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
        bankName: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        branchName: {
            type: Sequelize.STRING,
            defaultValue: null,
        },
        accountHolder: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        accountNumber: {
            type: Sequelize.BIGINT(20),
            required: true,
            allowNull: false
        },
        ifscCode: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        }
    }
};
