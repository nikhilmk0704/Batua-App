/**
 * ImageUploadController
 *
 * @description :: Server-side logic for managing ImageUpload
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 'use strict'

 module.exports={

 	upload:function(req,res){
 		var params=req;
 		var imageUploadService=new ImageUploadService();
 		imageUploadService.upload(params,function(err,result){
 			if(err)
 				return res.badRequest(err);
 			return res.json(200,result[0].extra.Location);
 		});
 	}
 }