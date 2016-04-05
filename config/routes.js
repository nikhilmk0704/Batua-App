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

    'post /api/category': 'CategoriesController.create',
    'get /api/category/:id?': 'CategoriesController.find',
    'put /api/category': 'CategoriesController.update',
    'delete /api/category/:id': 'CategoriesController.delete',

    'post /api/city': 'CitiesController.create',
    'get /api/city/:id?': 'CitiesController.find',
    'put /api/city': 'CitiesController.update',
    'delete /api/city/:id': 'CitiesController.delete',

    'post /api/merchant': 'MerchantsController.create',
    'get /api/user/:userId/merchant/:id?': 'MerchantsController.find',
    'get /api/salesagent/:salesAgentId/merchant/:id?': 'MerchantsController.find',
    'get /api/admin/:adminId/merchant/:id?': 'MerchantsController.find',
    'put /api/merchant': 'MerchantsController.update',
    'put /api/merchant/setstatus': 'MerchantsController.setStatus',

    'post /api/promocode': 'PromocodesController.create',
    'get /api/promocode/:id?': 'PromocodesController.find',
    'put /api/promocode/:id?': 'PromocodesController.update',
    'put /api/promocode/:id/status': 'PromocodesController.updateStatus',
   

    'post /api/ratereview': 'RateReviewsController.create',
    'get /api/ratereview/user/:userId/merchant/:merchantId':'RateReviewsController.find',
    'put /api/ratereview':'RateReviewsController.update',
    'delete /api/ratereview/:id':'RateReviewsController.delete',

    'post /api/usergroup': 'UserGroupsController.create',
    'get /api/usergroup/:id?': 'UserGroupsController.find',
    'put /api/usergroup': 'UserGroupsController.update',
    'delete /api/usergroup/:id': 'UserGroupsController.delete',

    'post /api/admin/user': 'UsersController.createUserByAdmin',
    'get /api/admin/user/:id?': 'UsersController.findUserByAdmin',
    'put /api/admin/user': 'UsersController.updateUserByAdmin',
    'put /api/admin/user/setstatus': 'UsersController.setUserStatusByAdmin',
    'post /api/admin/user/login':'UsersController.adminLogin',
    'put /api/admin/user/logout':'UsersController.adminLogout',


    'post /api/image/upload':'ImageUploadController.upload',
    
}
