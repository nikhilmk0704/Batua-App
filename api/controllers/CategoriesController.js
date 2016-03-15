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
                return res.badRequest(err);
            } else {
                return res.json(201, { result: result });
            }
        });
    },

    find: function(req, res) {

        var _id = req.param('id');
        var params = {};
        if (_id) {
            params.where = {};
            params.where.id = _id;
            var categoryService = new CategoryService();
            categoryService.find(params, function(err, result) {
                if (err) {
                    return res.badRequest(err);
                } else {
                    return res.json(200, { result: result });
                }
            });
        } else {
            var categoryService = new CategoryService();
            categoryService.findAll(params, function(err, result) {
                if (err) {
                    return res.badRequest(err);
                } else {
                    return res.json(200, { result: result });
                }
            });
        }
    },

    update: function(req, res) {

        var params = {};
        var options = {};
        params.name = req.body.name;
        options.where = {};
        options.where.id = req.body.id;

        var categoryService = new CategoryService();
        categoryService.update(params, options, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200, { result: result });
            }
        });
    },

    delete: function(req, res) {

        var _id = req.param('id');
        var options = {};
        options.where = {};
        options.where.id = _id;

        var categoryService = new CategoryService();
        categoryService.delete(options, function(err, result) {
            if (err) {
                return res.badRequest(err);
            } else {
                return res.json(200, { result: result });
            }
        });
    }
};
