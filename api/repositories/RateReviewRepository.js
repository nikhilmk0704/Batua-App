'use strict';

var BaseRepository = require('./BaseRepository.js');

class RateReviewRepository extends BaseRepository {

    constructor() {
        super(sails.models.ratereviews);
    }

}

module.exports = RateReviewRepository;
