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

    update(object, callback) {
        this.modelType.update(object).then(function(result) {
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

    remove(id) {
        this.modelType.destroy(id).then(this.handleSuccessResponse).catch(handleException);
    }

}

module.exports = BaseRepositorySequelize;
