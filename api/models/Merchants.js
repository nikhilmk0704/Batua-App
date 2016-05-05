/**
 * Merchants.js
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
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        shortCode: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            unique: true
        },
        profileImageUrl: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.BIGINT(10),
            required: true,
            unique: true,
            allowNull: false,
            validate: {
                validateLength: function(value) {
                    if (("" + "" + value).length != 10)
                        throw new Error("Give 10 digit Integer");
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        address: {
            type: Sequelize.TEXT,
        },
        latitude: {
            type: Sequelize.FLOAT,
        },
        longitude: {
            type: Sequelize.FLOAT,
        },
        averageRating: {
            type: Sequelize.DECIMAL(2, 1),
            validate: {
                min: 0,
                max: 5
            }
        },
        reviewersCount: {
            type: Sequelize.INTEGER,
        },
        fees: {
            type: Sequelize.FLOAT,
            required: true,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },
        bankName: {
            type: Sequelize.STRING,
        },
        branchName: {
            type: Sequelize.STRING,
        },
        accountHolder: {
            type: Sequelize.STRING,
        },
        accountNumber: {
            type: Sequelize.BIGINT(20),
        },
        ifscCode: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        }
    },
    associations: function() {
        Merchants.belongsTo(Locations, {
            as: 'locations',
            foreignKey: {
                name: 'locationId',
                defaultValue: null,
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            }
        });
        Merchants.belongsTo(Users, {
            as: 'users',
            foreignKey: {
                name: 'createdSalesId',
                allowNull: false,
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            }
        });
        Merchants.belongsTo(Categories, {
            as: 'categories',
            foreignKey: {
                name: 'categoryId',
                allowNull: false,
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            }
        });
        Merchants.belongsToMany(Galleries, {
            as: 'galleries',
            through: 'MerchantsGalleries',
            foreignKey: {
                name: 'merchantId',
            }
        });
        Galleries.belongsToMany(Merchants, {
            through: 'MerchantsGalleries',
            foreignKey: {
                name: 'galleryId'
            }
        });
    }
};
