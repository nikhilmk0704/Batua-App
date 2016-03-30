'use strict'

var S3upload=require('../utils/S3upload');

class ImageUploadService{
	
	upload(params,callback){
		var s3upload=new S3upload();
		s3upload.imageUpload(params,callback);
	}
}

module.exports=ImageUploadService;