/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

    var headerToken = req.headers.authorization,
        getToken = req.query.access_token,
        postToken = req.body ? req.body.access_token : undefined;

    // Check exactly one method was used
    var methodsUsed = (headerToken !== undefined) + (getToken !== undefined) +
        (postToken !== undefined);

    if (methodsUsed > 1) {
        return res.forbidden('Only one method may be used to authenticate at a time (Auth header,  ' +
            'GET or POST).');
    } else if (methodsUsed === 0) {
        return res.forbidden('The access token was not found');
    }

    // Header: http://tools.ietf.org/html/rfc6750#section-2.1
    if (headerToken) {
        var matches = headerToken.match(/Bearer\s(\S+)/);

        if (!matches) {
            return res.forbidden('Malformed auth header');
        }

        headerToken = matches[1];
    }

    // POST: http://tools.ietf.org/html/rfc6750#section-2.2
    if (postToken) {
        if (req.method === 'GET') {
            return res.forbidden('Method cannot be GET When putting the token in the body');
        }
    }

    var accessToken = headerToken || postToken || getToken;

    var oAuthAccessTokensService = new OAuthAccessTokensService();
    var options = {};
    options.where = {
        accessToken: accessToken,
        expires: {
            $gt: new Date()
        }
    };
    oAuthAccessTokensService.find(options, function(err, result) {
        if (!err) {
            var userService = new UserService();
            userService.find({
                where: {
                    id: result.userId
                }
            }, function(err, userData) {
                if (!err) {
                    req.user = {};
                    req.user.id = userData.userId;
                    req.user.groupId = userData.groupId;
                    next();
                }
            });
        } else {
            return res.forbidden('The access token was not found');
        }
    })
};
