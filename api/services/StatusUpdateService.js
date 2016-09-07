'use strict';

class StatusUpdateService {

    statusUpdateAndFind(params) {
      
        var rawQueryString = "UPDATE Offers SET status = :status where id in (SELECT id FROM(SELECT id FROM Offers where" +
            " TIMESTAMP(validTo) < NOW() AND status = 'Active') as virtualTable)";
        sequelize.query(rawQueryString, {
            replacements: { status: 'Expired'},
            type: sequelize.QueryTypes.UPDATE
        }).then(function(result) {
               var rawQueryString = "UPDATE Promocodes SET status = :status where id in (SELECT id FROM ( SELECT id FROM Promocodes where" +
            " TIMESTAMP(validTo) < NOW() AND status = 'Active') as virtualTable)";
        sequelize.query(rawQueryString, {
            replacements: { status: 'Expired'},
            type: sequelize.QueryTypes.UPDATE
        }).then(function(result) {
               console.log('row updated')
        })
           
        })
    }

}

module.exports = StatusUpdateService;
