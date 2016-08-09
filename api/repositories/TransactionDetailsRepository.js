'use strict';

var BaseRepository = require('./BaseRepository.js');

class TransactionDetailsRepository extends BaseRepository {

    constructor() {
        super(sails.models.transactiondetails);
    }

}

module.exports = TransactionDetailsRepository;