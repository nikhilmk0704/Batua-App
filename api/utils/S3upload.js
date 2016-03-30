'use strict'

class S3upload {

    imageUpload(params, callback) {
        params.file('image').upload({
            adapter: require('skipper-s3'),
            key: sails.config.credentials.s3Bucket.key,
            secret: sails.config.credentials.s3Bucket.secret,
            bucket: sails.config.credentials.s3Bucket.bucket,
        }, function(err, uploadedFile) {
            if (err)
                return callback(err);
            return callback(null, uploadedFile);
        });
    }
}

module.exports=S3upload;
