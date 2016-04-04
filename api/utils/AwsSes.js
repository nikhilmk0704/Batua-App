'use strict'

var aws=require('aws-sdk');

class AwsSes {

    sendEmail(mailObject, callback) {
        aws.config.update(sails.config.connections.ses);
        var ses=new aws.SES({apiVersion: '2012-10-17'});
        ses.sendEmail(mailObject,function(err,result){
            if(err)
                return callback(err);
            return callback(null,result);
        });
    }
}

module.exports=AwsSes;
