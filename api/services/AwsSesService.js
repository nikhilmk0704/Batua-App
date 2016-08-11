'use strict'

var AwsSes=require('../utils/AwsSes.js');

class AwsSesService{

	sendEmail(params,callback){
		var awsSes=new AwsSes();
		var awsSesService=new AwsSesService();
		var mailObject=awsSesService.getMailObject(params);
		awsSes.sendEmail(mailObject,callback);
	}

	// receivers should be array
	getMailObject(params){
		var mailObject={};
		mailObject.Source=params.sender;
		mailObject.Destination={};
		mailObject.Destination.ToAddresses=params.receivers;
		mailObject.Message={};
		mailObject.Message.Subject={};
		mailObject.Message.Subject.Data=params.subjectText;
		mailObject.Message.Body={};
		mailObject.Message.Body.Text={};
		mailObject.Message.Body.Text.Data=params.bodyText;
		(params.htmlTemplate) && (mailObject.Message.Body.Html={Data:params.htmlTemplate});
		return mailObject;
	}

}

module.exports=AwsSesService;