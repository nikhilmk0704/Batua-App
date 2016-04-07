/**
 * Locations.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        area: {
            type: Sequelize.TEXT,
        },
        pincode: {
            type: Sequelize.INTEGER(6),
            validate:{
                min:100000,
                max:999999
            }
        },
    },
    associations: function() {
        Locations.belongsTo(Cities, {
            foreignKey: {
                name: 'cityId',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            }
        });
    }
};
