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
        transactionId: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
        },
        mode: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        paymentId: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
        },
        amount: {
            type: Sequelize.FLOAT
        },
        additionalCharges: {
            type: Sequelize.FLOAT,
            defaultValue: 0.0
        },
        netAmountDebited: {
            type: Sequelize.FLOAT
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
