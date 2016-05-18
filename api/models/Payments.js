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
        promocodeAmount: {
            type: Sequelize.FLOAT,
            required: true,
            allowNull: false,
        },
        batuaCommission: {
            type: Sequelize.FLOAT,
            required: true,
            allowNull: false,
        },
        merchantFee: {
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
            type: Sequelize.STRING  // enum values needs to be added
        },
        cancellationDate: {
            type: Sequelize.DATE,
        },
        cancellationDescription: {
            type: Sequelize.STRING,
        },
    },
    associations: function() {
        Payments.belongsTo(Users, { 
            as:'user',
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        });
        Payments.belongsTo(Users, { 
            as:'cancelledBy',
            foreignKey: {
                name: 'adminId'
            }
        });
        Payments.belongsTo(Promocodes, { 
            as:'promocode',
            foreignKey: {
                name: 'promocodeId',
            }
        });
        Payments.belongsTo(Offers, {
            as:'offerDiscount',
            foreignKey: {
                name: 'offerDiscountId',
            }
        });
        Payments.belongsTo(Merchants, { 
            as:'merchant',
            foreignKey: {
                name: 'merchantId',
                allowNull: false
            }
        });
        Payments.belongsTo(Paymentmodes, {
            as:'paymentMode',
            foreignKey: {
                name: 'paymentModeId'
            }
        });
        Payments.belongsTo(TransactionDetails, {
            as:'transactionDetail',
            foreignKey: {
                name: 'transactionDetailId',
                allowNull: false
            }
        });
    }
};
