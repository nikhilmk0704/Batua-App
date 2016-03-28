/**
 * Payments.js
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
        initialAmount: {
            type: Sequelize.FLOAT,
            required: true,
            allowNull: false,
        },
        reducedAmount: {
            type: Sequelize.FLOAT,
            required: true,
            allowNull: false,
        },
        paidAmount: {
            type: Sequelize.FLOAT,
            required: true,
            allowNull: false,
        },
        isConfirmed: {
            type: Sequelize.BOOLEAN,
            required: true,
            allowNull: false,
            defaultValue: false,
        },
        isCancelled: {
            type: Sequelize.BOOLEAN,
            required: true,
            allowNull: false,
            defaultValue: false,
        },
        type: {
            type: Sequelize.STRING,  // enum values needs to be added
            required: true,
            allowNull: false,
        },
        canccellationDate: {
            type: Sequelize.DATE,
        },
        cancellationDescription: {
            type: Sequelize.STRING,
        },
    },
    associations: function() {
        Payments.belongsTo(Users, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });
        Payments.belongsTo(Promocodes, {
            foreignKey: {
                name: 'promocodeId',
            }
        });
        Payments.belongsTo(OfferDiscounts, {
            foreignKey: {
                name: 'offerDiscountId',
            }
        });
        Payments.belongsTo(Merchants, {
            foreignKey: {
                name: 'merchantId',
                allowNull: false
            }
        });
        Payments.belongsTo(Paymentmodes, {
            foreignKey: {
                name: 'paymentModeId',
                allowNull: false
            }
        });
        Payments.belongsTo(TransactionDetails, {
            foreignKey: {
                name: 'transactionDetailId',
                allowNull: false
            }
        });
    }
};
