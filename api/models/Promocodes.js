/**
 * Promocodes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var moment = require('moment');

module.exports = {

    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        promocode: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
        },
        discountPercentage: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false,
            validate: {
                min: 0,
                max: 100,
            }
        },
        description: {
            type: Sequelize.STRING,
        },
        maximumAmountLimit: {
            type: Sequelize.INTEGER,
        },
        validFrom: {
            type: Sequelize.DATE,
            required: true,
            allowNull: false
        },
        validTo: {
            type: Sequelize.DATE,
            required: true,
            allowNull: false
        },
        percentageCostBourneByBatua: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false,
            validate: {
                min: 0,
                max: 100,
            }
        },
        percentageCostBourneByMerchant: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false,
            validate: {
                min: 0,
                max: 100,
            }
        },
        status: {
            type: Sequelize.ENUM,
            values: ['Active', 'Suspend', 'Expired'],
            defaultValue: 'Active'
        }
    },
    associations: function () {
        Promocodes.belongsToMany(Merchants, {
            as:'merchants',
            through: MerchantsPromocodes,
            foreignKey: {
                name: 'promocodeId'
            }
        });
        Merchants.belongsToMany(Promocodes, {
            through: MerchantsPromocodes,
            foreignKey: {
                name: 'merchantId',
            }
        });
    }
};