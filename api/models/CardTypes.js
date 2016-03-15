/**
 * CardTypes.js
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
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        }
    },
    associations: function() {
        CardTypes.belongsTo(Paymentmodes, {
            foreignKey: {
                name: 'paymentmodeId',
                allowNull: false
            }
        });
    }
};
