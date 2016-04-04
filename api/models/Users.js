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
        name: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.BIGINT(10),
            unique: true,
            validate:{
                min:0,
                max:9999999999
            }
        },
        profileImageUrl: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
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
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
        pin: {
            type: Sequelize.INTEGER(4),
            validate:{
                min:1000,
                max:9999
            }
        },
        isPinActivated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        otp: {
            type: Sequelize.INTEGER(6),
            defaultValue: null,
        },
        status: {
            type: Sequelize.STRING,
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

