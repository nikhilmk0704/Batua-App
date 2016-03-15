/**
 * TransactionDetails.js
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
        },
        orderNumber: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
        },
        mode: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        txnid: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
        },
        amount: {
            type: Sequelize.FLOAT,
            required: true,
            allowNull: false,
        },
        additionalCharges: {
            type: Sequelize.FLOAT,
            defaultValue: 0.0,
        },
        netAmountDebited: {
            type: Sequelize.FLOAT,
            required: true,
            allowNull: false,
        },
        bankReferenceNumber: {
            type: Sequelize.STRING,
        },
        cardType: {
            type: Sequelize.STRING,
        },
        cardNumber: {
            type: Sequelize.STRING,
        },
        expiryDate: {
            type: Sequelize.DATE
        }
    }
};
