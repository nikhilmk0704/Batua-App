var validateAccess = function(qry, callback) {
    sequelize.query(qry).spread(function(metaData, data) {
        var count = ((data && data[0]) ? data[0].count : null);
        return (!data || count != 1) ? callback('err', false) : callback(null, true);
    }).catch(callback);
};

var isGlobalAPI = function(params, callback) {
    var isGlobal;
    GlobalApi.findAll({ attributes: ['endpoints'] }).then(function(data) {
        isGlobal = data.some(function(point) {
            return point.dataValues.endpoints == params['controller']
        });
        return callback(null, (isGlobal && (params.method != 'DELETE')));
    }).catch(function(exception){
    	callback(exception);
    });
}

var adminValidation = function(params, callback) {
    if (params['accessToken']) {
        var qry = "select count(*) as count from AuthBearer where accessToken = '" + params['accessToken'] + "' and groupName='Admin'";
        validateAccess(qry, callback);
    }
};

var userValidation = function(params, callback) {
    if (params['accessToken']) {
        var qry = "select count(*) as count from AuthBearer where accessToken = '" + params['accessToken'] + "' and groupName='User'";
        validateAccess(qry, callback);
    }
};

var salesAgentValidation = function(params, callback) {
    if (params['accessToken']) {
        var qry = "select count(*) as count from AuthBearer where accessToken = '" + params['accessToken'] + "' and groupName='Field Sales Agent'";
        validateAccess(qry, callback);
    }
};

var validateAccessToken = function(params, callback) {
	if(params['user-agent']=='Batua-SalesAgent-Android')
		return salesAgentValidation(params,callback);
	if(params['user-agent']=='Batua-User-Android')
		return userValidation(params,callback);
	return adminValidation(params,callback);
};

module.exports = function(req, res, next) {
    var params = {}
    params.accessToken = req.headers['access-token'];
    params.method = req.method;
    params.controller = req.options.controller;
    params.api = req.options.action;
    params['userAgent'] = req.headers['user-agent'];
    isGlobalAPI(params, function(err, isGlobal) {
        if (isGlobal)
            return next();
        if (params['accessToken'] && params['accessToken'].length > 10) {
            validateAccessToken(params, function(err, isValid) {
                if (!err && isValid)
                    return next();
                return res.forbidden('You are not permitted to perform this action.');
            });
            return null;
        }
        return res.forbidden('You are not permitted to perform this action.');
    })

};
