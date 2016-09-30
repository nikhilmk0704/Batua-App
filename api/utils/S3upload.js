'use strict'

class S3upload {

    /*imageUpload(params, callback) {
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
    }*/
    imageUpload(params, callback) {
        var AWS = require('aws-sdk');
        // For dev purposes only
        AWS.config.update({ accessKeyId: sails.config.connections.s3Bucket.key, 
            secretAccessKey: sails.config.connections.s3Bucket.secret });
        var s3 = new AWS.S3();
        s3.putObject({
            Bucket: sails.config.connections.s3Bucket.bucket,
            Body: params.image
        }).done(function (err,resp) {
            if (err)
                console.log(err);
                //return callback(err);
            console.log(resp);
            //return callback(null, uploadedFile[0].extra.Location);
            console.log('Successfully uploaded package.');
        });
    }

}


module.exports=S3upload;
