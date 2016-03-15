/**
 * RateReviews.js
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
        rating: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5,
            }
        },
        review: {
            type: Sequelize.STRING,
            defaultValue: null,
        }
    },
    associations: function() {
        RateReviews.belongsTo(Users, {
            foreignKey: {
                name: 'userId',
                required: true,
                allowNull: false,
            }
        });
        RateReviews.belongsTo(Merchants, {
            foreignKey: {
                name: 'merchantId',
                required: true,
                allowNull: false,
            }
        });
    }
};
