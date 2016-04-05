'use strict';

class BaseRepositorySequelize {

    constructor(modelType) {
        this.modelType = modelType;
    }

    save(object, callback) {
        this.modelType.create(object).then(function(result) {
            callback(null, result);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    bulkSave(object, callback) {
        var baseId = object.baseId;
        var associateIds = object.associateIds;
        var baseAttribute = object.baseAttribute;
        var associateAttribute = object.associateAttribute;
        // var joinTable = object.joinTable;
        var data = [];

        associateIds.forEach(function(id) {
            var obj = {};
            obj[baseAttribute] = baseId;
            obj[associateAttribute] = id;
            data.push(obj);
        });
        var duplicateObject = {};
        duplicateObject.updateOnDuplicate = [baseAttribute, associateAttribute];
        
        this.modelType.bulkCreate(data, duplicateObject).then(function(result) {
            callback(null, result);
        }).catch(function(exception) {
            callback(exception,null);
        });
    }

    bulkInsert(object, callback) {
        this.modelType.bulkCreate(object).then(function(result) {
            callback(null, result);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    update(object, options, callback) {
        this.modelType.update(object, options).then(function(result) {
            callback(null, result);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    upsert(object, callback) {
        this.modelType.upsert(object).then(function(result) {
            callback(null, result);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    find(options, callback) {
        this.modelType.find(options).then(function(result) {
            callback(null, result);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    findAll(options, callback) {
        this.modelType.findAll(options).then(function(result) {
            callback(null, result);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    remove(options, callback) {
        this.modelType.destroy(options).then(function(result) {
            callback(null, result);
        }).catch(function(exception) {
            callback(exception);
        });
    }

    upload(object,credential,callback){
        domain.run(function safelyUpload() {
            if (req.file('image')._files.length > 0) {
                req.file('image').upload(credential, function (err, uploadedFiles) {
                    if (err || (!(uploadedFiles[0]))) return error.send(res, 400, err);
                    else {
                        var url = uploadedFiles[0].extra.Location;
                        res.ok({
                            url: url
                        });
                    }
                });
            } else {
                error.send(res, 400, {
                    'message': 'File not found'
                });
            }
        })
    }
}

module.exports = BaseRepositorySequelize;
