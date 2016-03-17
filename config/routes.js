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

    // 'post /oauth/client': 'OAuthClientsController.create',

    // 'get /api/permissions': 'PermissionsController.find',
    // 'put /api/permissions': 'PermissionsController.update',

    // 'post /api/user': 'UserController.create',

    // 'post /email/send': 'EmailController.send',

    'post /api/category': 'CategoriesController.create',
    'get /api/category/:id?': 'CategoriesController.find',
    'put /api/category': 'CategoriesController.update',
    'delete /api/category/:id?': 'CategoriesController.delete',

    'post /api/city': 'CitiesController.create',
    'get /api/city/:id?': 'CitiesController.find',
    'put /api/city': 'CitiesController.update',
    'delete /api/city/:id?': 'CitiesController.delete',

    'post /api/status': 'StatusesController.create',
    'get /api/status/:id?': 'StatusesController.find',
    'put /api/status': 'StatusesController.update',
    'delete /api/status/:id?': 'StatusesController.delete',

    'post /api/merchant': 'MerchantsController.create',
    'get /api/merchant/:id?': 'MerchantsController.find',
    'put /api/merchant': 'MerchantsController.update',
    'delete /api/merchant/:id?': 'MerchantsController.delete',
    'put /api/merchant/setstatus': 'MerchantsController.Setstatus',

    'post /api/gallery': 'GalleriesController.create',
    'get /api/gallery': 'GalleriesController.find',
    // 'put /api/gallery': 'GalleriesController.update',
    // 'delete /api/gallery/:id?': 'GalleriesController.delete',

}
