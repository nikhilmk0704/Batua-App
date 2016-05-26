'use strict';

var SettlementRepository = require('../repositories/SettlementRepository.js');
var moment = require('moment');

class SettlementService {

    save(params, callback) {

        if (!params.name)
            return callback("Please provide Name");
        if (!params.date)
            return callback("Please provide Date");
        if(!moment(params.date).isValid())
            return callback("Incorrect Date");
        if (!params.referenceNumber)
            return callback("Please provide Reference Number");
        if (!params.description)
            return callback("Please provide Description");

        var settlementRepository = new SettlementRepository();
        settlementRepository.save(params, callback);

    }

}

module.exports = SettlementService;
