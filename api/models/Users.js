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
            validate: {
                validateLength: function(value) {
                    if (("" + "" + value).length != 10)
                        throw new Error("Give 10 digit Integer");
                }
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
            validate: {
                isWhiteSpace: function(value) {
                    if (/\s/g.test(value))
                        throw new Error("Spaces not allowed");
                },
                length: function(value) {
                    if (value.length < 6)
                        throw new Error("Minimum length six");
                }
            }
        },
        pin: {
            type: Sequelize.INTEGER(4),
            validate: {
                min: 1000,
                max: 9999
            }
        },
        isPinActivated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        otp: {
            type: Sequelize.INTEGER(6),
        },
        status: {
            type: Sequelize.STRING,
        },
        latitude: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.FLOAT
        },
        locationUpdateTime: {
            type: Sequelize.DATE
        }
    },
    options: {
        hooks: {
            beforeCreate: hashPasswordHook
        }
    },
    associations: function() {
        Users.belongsTo(UserGroups, {
            as: 'userGroups',
            foreignKey: {
                name: 'userGroupId',
                required: true,
                allowNull: false
            }
        });
        Users.belongsToMany(Paymentmodes, {
            as: 'paymentmodes',
            through: 'UsersPaymentmodes',
            foreignKey: {
                name: 'userId'
            }
        });
        Paymentmodes.belongsToMany(Users, {
            through: 'UsersPaymentmodes',
            foreignKey: {
                name: 'paymentmodeId'
            }
        });
        AccessTokens.belongsToMany(Users, {
            as: 'users',
            through: 'UsersAccessTokens',
            foreignKey: {
                name: 'accessTokenId',
                allowNull: false
            }
        });
        Users.belongsToMany(AccessTokens, {
            as: 'accessTokens',
            through: 'UsersAccessTokens',
            foreignKey: {
                name: 'userId',
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
