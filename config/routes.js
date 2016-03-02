/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {

    'post /oauth/client': 'OAuthClientsController.create',

    'get /api/permissions': 'PermissionsController.find',
    'put /api/permissions': 'PermissionsController.update',

    'post /api/user': 'UserController.create',

    'post /email/send': 'EmailController.send'

}
