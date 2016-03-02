/**
 * Permissions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        create: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            required: true
        },
        read: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            required: true
        },
        update: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            required: true
        },
        remove: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            required: true
        }
    },

    associations: function() {
        Permissions.belongsTo(Groups, {
            foreignKey: {
                name: 'groupId',
                allowNull: false
            }
        });

        Permissions.belongsTo(Modules, {
            foreignKey: {
                name: 'moduleId',
                allowNull: false
            }
        });
    }
};
