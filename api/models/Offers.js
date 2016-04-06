/**
 * Offers.js
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
            allowNull: false,
            validate: {
                isDate: true,
                isAfter: function () {
                    var oldDate = moment(Sequelize.DATE())._d;
                    var validateDate = moment(this.validFrom)._d;
                    if (!(moment(validateDate).isAfter(oldDate))) {
                        throw new Error('Past dates are not allowed');
                    }
                }
            }
        },
        validTo: {
            type: Sequelize.DATE,
            required: true,
            allowNull: false,
            validate: {
                isDate: true,
                isAfter: function () {
                    var validateDateFrom = moment(this.validFrom)._d;
                    var validateDateTo = moment(this.validTo)._d;
                    if (!(moment(validateDateTo).isAfter(validateDateFrom))) {
                        throw new Error('Past dates are not allowed');
                    }
                }
            }
        },
        status: {
            type: Sequelize.ENUM,
            values: ['Active', 'Suspend', 'Expired'],
            defaultValue: 'Active'
        }
    },
    associations: function () {
        Offers.belongsToMany(Merchants, {
            through: MerchantsOffers,
            foreignKey: {
                name: 'offerId'
            }
        });
        Merchants.belongsToMany(Offers, {
            through: MerchantsOffers,
            foreignKey: {
                name: 'merchantId',
            }
        });
    }
};