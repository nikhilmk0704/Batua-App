/**
 * OAuthClients.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {


    attributes: {
        clientId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        clientSecret: {
            type: Sequelize.STRING,
            unique: true
        },
        redirectUri: {
            type: Sequelize.STRING
        }
    },
    options: {
        hooks: {
            beforeCreate: generateClientHook
        }
    }

};

function generateClientId() {
    return TokenService.uidLight(40);
}

function generateClientSecret() {
    return TokenService.uid(255);
}

function generateClientHook(instance, options, callback) {

    instance.set('clientId', generateClientId());
    instance.set('clientSecret', generateClientSecret());
    callback(null, instance);

}
