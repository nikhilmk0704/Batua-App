'use strict'

class S3upload {

    imageUpload(params, callback) {
        params.image.upload({
            adapter: require('skipper-s3'),
            key: sails.config.connections.s3Bucket.key,
            secret: sails.config.connections.s3Bucket.secret,
            bucket: sails.config.connections.s3Bucket.bucket,
        }, function(err, uploadedFile) {
            if (err)
                return callback(err);
            return callback(null, uploadedFile[0].extra.Location);
        });
    }
}

module.exports=S3upload;
