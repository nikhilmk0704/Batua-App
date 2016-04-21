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

    /********************* Category API ************************/

    'post /api/category': 'CategoriesController.create',
    'get /api/category/:id?': 'CategoriesController.find',
    'put /api/category': 'CategoriesController.update',
    'delete /api/category/:id': 'CategoriesController.delete',

    /********************* City API ************************/

    'post /api/city': 'CitiesController.create',
    'get /api/city/:id?': 'CitiesController.find',
    'put /api/city': 'CitiesController.update',
    'delete /api/city/:id': 'CitiesController.delete',

    /********************* Merchants Module API ************************/

    'post /api/merchant': 'MerchantsController.create',
    'get /api/user/:userId/merchant/:id?': 'MerchantsController.find',
    'get /api/salesagent/:salesAgentId/merchant/:id?': 'MerchantsController.find',
    'get /api/admin/:adminId/merchant/:id?': 'MerchantsController.find',
    'get /api/merchant/:id?': 'MerchantsController.getActiveMerchants',
    'put /api/merchant': 'MerchantsController.update',
    'put /api/merchant/setstatus': 'MerchantsController.setStatus',

    /********************* Promocodes API ************************/

    'post /api/promocode': 'PromocodesController.create',
    'get /api/promocode/:id?': 'PromocodesController.find',
    'put /api/promocode/:id?': 'PromocodesController.update',
    'put /api/promocode/:id/status': 'PromocodesController.updateStatus',

    /********************* Offer API ************************/

    'post /api/offer': 'OfferController.create',
    'get /api/offer/:id?': 'OfferController.find',
    'put /api/offer/:id?': 'OfferController.update',
    'put /api/offer/:id/status': 'OfferController.updateStatus',
   
    /********************* Rate Review API ************************/

    'post /api/ratereview': 'RateReviewsController.create',
    'get /api/ratereview/user/:userId/merchant/:merchantId':'RateReviewsController.find',
    'put /api/ratereview':'RateReviewsController.update',
    'delete /api/ratereview/:id':'RateReviewsController.delete',

    /********************* User Groups API ************************/

    'post /api/usergroup': 'UserGroupsController.create',
    'get /api/usergroup/:id?': 'UserGroupsController.find',
    'put /api/usergroup': 'UserGroupsController.update',
    'delete /api/usergroup/:id': 'UserGroupsController.delete',

    /********************* Admin Portal API ************************/

    'post /api/admin/user': 'UsersController.createUserByAdmin',
    'get /api/admin/user/:id?': 'UsersController.findUserByAdmin',
    'put /api/admin/user': 'UsersController.updateUserByAdmin',
    'put /api/admin/user/setstatus': 'UsersController.setUserStatusByAdmin',
    'post /api/admin/user/login':'UsersController.adminLogin',
    'put /api/admin/user/logout':'UsersController.adminLogout',
    'put /api/admin/user/forgotpassword':'UsersController.adminForgotPassword',
    'put /api/admin/user/resetpassword':'UsersController.adminResetPassword',
    'put /api/admin/user/changepassword':'UsersController.adminChangePassword',

    /********************* Field Sales Agent App API ************************/
    
    'get /api/salesagent/:salesagentId/profile':'UsersController.getProfile',
    'put /api/salesagent/:salesagentId/profile':'UsersController.updateSalesAgentProfile',
    'put /api/salesagent/resetpassword':'UsersController.salesAgentResetPassword',
    'put /api/salesagent/forgotpassword':'UsersController.salesAgentForgotPassword',
    'put /api/salesagent/verifyotp':'UsersController.salesAgentVerifyOtp',
    'put /api/salesagent/logout':'UsersController.salesAgentLogout',
    'post /api/salesagent/normal/login':'UsersController.salesAgentNormalLogin',
    'post /api/salesagent/social/login':'UsersController.salesAgentSocialLogin',

    /********************* User App API ************************/

    'get /api/user/:userId/profile':'UsersController.getProfile',
    'put /api/user/profile':'UsersController.updateUserProfile',
    'put /api/user/pin/status':'UsersController.updatePinStatus',
    'put /api/user/pin/reset':'UsersController.resetPin',
    'post /api/user/normal/signup':'UsersController.normalSignup',
    'post /api/user/social/signup':'UsersController.socialSignup',
    'put /api/user/signup/verifyotp':'UsersController.verifyOtpForSignup',
    'put /api/user/signup/sendotp':'UsersController.sendOtpForSignup',
    'post /api/user/normal/login':'UsersController.normalLogin',
    'post /api/user/social/login':'UsersController.socialLogin',
    'put /api/user/logout':'UsersController.logout',

    /********************* Image Upload API ************************/

    'post /api/image/upload':'ImageUploadController.upload',
    
}
