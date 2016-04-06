/**
 * MerchantsOffers.js
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
        }
    },
    associations: function() {
        MerchantsPromocodes.belongsTo(Merchants, {
            foreignKey: {
                name: 'merchantId'
            }
        });
        MerchantsPromocodes.belongsTo(Offers, {
            foreignKey: {
                name: 'offerId'
            }
        });
    }
};
