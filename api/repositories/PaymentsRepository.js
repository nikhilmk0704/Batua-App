'use strict';

var BaseRepository = require('./BaseRepository.js');

class PaymentsRepository extends BaseRepository {

    constructor() {
        super(sails.models.payments);
    }

}

module.exports = PaymentsRepository;