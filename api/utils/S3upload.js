'use strict'

class S3upload {

    imageUpload(params, callback) {
        params.image.upload({
            adapter: require('skipper-s3'),
            key: sails.config.connections.s3Bucket.key,
            secret: sails.config.connections.s3Bucket.secret,
            bucket: sails.config.connections.s3Bucket.bucket
        }, function(err, uploadedFile) {
            if (err)
                return callback(err);
            console.log(uploadedFile[0].extra.Location);
            return callback(null, uploadedFile[0].extra.Location);
        });
    }
    /*imageUpload(param, callback) {
        
        var AWS = require('aws-sdk');
        // For dev purposes only
        AWS.config.update({ accessKeyId: sails.config.connections.s3Bucket.key, 
            secretAccessKey: sails.config.connections.s3Bucket.secret });
        
        var s3 = new AWS.S3();
        
        var options = {partSize: 10 * 1024 * 1024, queueSize: 1,maxTimeToBuffer:10000};
        
        var params = {
                Bucket: sails.config.connections.s3Bucket.bucket,
                Body: param.image,
                Key: param.image.originalFilename
            };

            s3.upload(params,options, function (perr, pres) {
                
                if (perr) {
                    return callback(param.image,param.image);
                } else {
                    return callback(null,pres);
                }
        });
    }*/

}


module.exports=S3upload;
