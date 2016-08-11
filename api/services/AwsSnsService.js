'use strict'

var AwsSns=require('../utils/AwsSns.js');

class AwsSnsService{
	
	sendNotification(deviceToken,message,title,callback){
		var awsSns=new AwsSns();
		awsSns.sendNotification(deviceToken,message,title,callback);
	}

}

module.exports=AwsSnsService;