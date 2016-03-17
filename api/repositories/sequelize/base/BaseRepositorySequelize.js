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
            callback(exception);
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

    updateAndFind(object, options, findObject, callback) {
        var model = this.modelType;
        model.update(object, options).then(function(updatedRowCount) {
            model.find(findObject).then(function(result) {
                callback(null, result);
            }).catch(function(exception) {
                callback(exception);
            });
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

    upload(object, credential, callback) {
        var domain = require('domain').create();
        domain.on('error', function() {});
        domain.run(function safelyUpload() {
            // if (object.file('image')._files.length > 0) {
            object.file('image').upload(credential, function( /*err, */ uploadedFiles) {
                // if (err || (!(uploadedFiles[0]))) return callback(err);
                // else {
                var url = uploadedFiles[0].extra.Location;
                callback(null, url);
                // }
            }).catch(function(exception) {
                callback(exception);
            });
            // } else {
            //     callback("Please upload file");
            // }
        });
    }

}

module.exports = BaseRepositorySequelize;
