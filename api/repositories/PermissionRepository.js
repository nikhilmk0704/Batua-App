'use strict';

var BaseRepository = require('./BaseRepository.js');

class PermissionRepository extends BaseRepository {

    constructor() {
        super(sails.models.permissions);
    }

}

module.exports = PermissionRepository;