/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

    create: function(req, res) {
        var params = req.body;
        var categoryService = new CategoryService();
        categoryService.save(params, function(err, result) {
            if (err) {
                return res.badRequest(categoryService.generateErrorMessage(err));
            } 
            return res.json(201,result);
        });
    },

    find: function(req, res) {
        var id = req.param('id');
        var categoryService = new CategoryService();
        categoryService.find(id, function(err, result) {
            if (err) {
                return res.badRequest(categoryService.generateErrorMessage(err));
            } 
            if(_.isEmpty(result)){
                return res.notFound(categoryService.generateErrorMessage("Does not exist"));
            }
            return res.json(200,result);
        });
    },

    update: function(req, res) {
        var params=req.body;
        var categoryService = new CategoryService();
        categoryService.updateAndFind(params, function(err, result) {
            if (err) {
                return res.badRequest(categoryService.generateErrorMessage(err));
            } 
            return res.json(200,result);
        });
    },

    delete: function(req, res) {
        var id=req.param('id');
        var categoryService = new CategoryService();
        categoryService.delete(id, function(err, result) {
            if (err) {
                return res.badRequest(categoryService.generateErrorMessage(err));
            } 
            return res.jsonx(200,result);
        });
    }
};
