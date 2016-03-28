/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var md5 = require('md5');

module.exports = {

    attributes: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.INTEGER(10),
            required: true,
            allowNull: false,
            unique: true,
        },
        profileImageUrl: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        isPhoneVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        facebookId: {
            type: Sequelize.STRING,
        },
        googleId: {
            type: Sequelize.STRING,
        },
        batuaId: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
        pin: {
            type: Sequelize.INTEGER(4),
        },
        isPinActivated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        otp: {
            type: Sequelize.STRING(8),
            defaultValue: null,
        },
        status: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        walletBalance: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        }
    },
    options: {
        hooks: {
            beforeCreate: hashPasswordHook
        }
    },
    associations: function() {
        Users.belongsTo(UserGroups, {
            foreignKey: {
                name: 'userGroupId',
                required:true,
                allowNull: false
            }
        });
    }
};

function hashPassword(password) {
    return md5(password);
};

function hashPasswordHook(instance, options, callback) {
    instance.set('password', hashPassword(instance.get('password')));
    callback(null, instance);
}

