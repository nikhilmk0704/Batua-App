/**
 * Users.js
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
    },
    associations: function() {
        Users.belongsTo(Statuses, {
            foreignKey: {
                name: 'statusId',
                allowNull: false
            }
        });
        Users.belongsTo(UserGroups, {
            foreignKey: {
                name: 'userGroupId',
                allowNull: false
            }
        });
        Users.belongsTo(Authentications, {
            foreignKey: {
                name: 'authenticationId',
                allowNull: false
            }
        });
        Users.belongsTo(Wallets, {
            foreignKey: {
                name: 'walletId',
            }
        });
    }
};


// var md5 = require('md5');

// module.exports = {

//     attributes: {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         firstname: {
//             type: Sequelize.STRING,
//             required: true
//         },
//         lastname: {
//             type: Sequelize.STRING,
//             required: true
//         },
//         dateOfBirth: {
//             type: Sequelize.DATE,
//             required: false
//         },
//         designation: {
//             type: Sequelize.STRING,
//             required: false
//         },
//         phone: {
//             type: Sequelize.STRING,
//             required: false
//         },
//         addressLine1: {
//             type: Sequelize.STRING,
//             required: false
//         },
//         addressLine2: {
//             type: Sequelize.STRING,
//             required: false
//         },
//         street: {
//             type: Sequelize.STRING,
//             required: false
//         },
//         city: {
//             type: Sequelize.STRING,
//             required: false
//         },
//         state: {
//             type: Sequelize.STRING,
//             required: false
//         },
//         country: {
//             type: Sequelize.STRING,
//             required: false
//         },
//         email: {
//             type: Sequelize.STRING,
//             required: true,
//             unique: true,
//             validate: {
//                 isEmail: true
//             }
//         },
//         password: {
//             type: Sequelize.STRING,
//             required: true
//         }
//     },
//     options: {
//         hooks: {
//             beforeCreate: hashPasswordHook,
//             beforeFind: hashPasswordForFindHook
//         }
//     },
//     instanceMethods: {
//         toJSON: function() {
//             var values = this.get();
//             delete values.password;
//             return values;
//         }
//     },

//     associations: function() {
//         User.belongsTo(Groups, {
//             foreignKey: {
//                 name: 'groupId',
//                 allowNull: true
//             }
//         });
//     }

// }

// function hashPassword(password) {
//     return md5(password);
// };

// function hashPasswordHook(instance, options, callback) {
//     instance.set('password', hashPassword(instance.get('password')));
//     callback(null, instance);
// };

// function hashPasswordForFindHook(instance, callback) {

//     if (instance.where.password) {
//         instance.where.password = hashPassword(instance.where.password);
//     }

//     callback(null, instance);
// };