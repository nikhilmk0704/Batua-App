'use strict'

var AccessTokensRepository=require('../repositories/AccessTokensRepository.js');

class AccessTokensService{
	update(params,options,callback){
		var accessTokensRepository=new AccessTokensRepository();
		accessTokensRepository.update(params,options,callback);
	}
}

module.exports = AccessTokensService;
