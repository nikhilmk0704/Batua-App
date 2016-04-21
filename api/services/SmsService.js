'use strict'

var Sms=require('../utils/Sms.js');

class SmsService{
	send(params,callback){
		var sms=new Sms();
		sms.send(params,callback);
	}
}

module.exports=SmsService;