'use strict'

var Sms=require('../utils/Sms.js');

class SmsService{
	send(params,callback){
		var sms=new Sms();
		sms.send(params,callback);
	}

	sendForTransaction(params,callback){
		var sms=new Sms();
		sms.smsSendForTransaction(params,callback);
	}
}

module.exports=SmsService;