/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

    /***************************************************************************
     *                                                                          *
     * Local disk storage for DEVELOPMENT ONLY                                  *
     *                                                                          *
     * Installed by default.                                                    *
     *                                                                          *
     ***************************************************************************/
    localDiskDb: {
        adapter: 'sails-disk'
    },

    /***************************************************************************
     *                                                                          *
     * MySQL is the world's most popular relational database.                   *
     * http://en.wikipedia.org/wiki/MySQL                                       *
     *                                                                          *
     * Run: npm install sails-mysql                                             *
     *                                                                          *
     ***************************************************************************/
    someMysqlServer: {
        adapter: 'sails-mysql',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'batua',
        supportBigNumbers: true,
        bigNumberStrings: true,
    } ,

    /***************************************************************************
     *                                                                          *
     * MongoDB is the leading NoSQL database.                                   *
     * http://en.wikipedia.org/wiki/MongoDB                                     *
     *                                                                          *
     * Run: npm install sails-mongo                                             *
     *                                                                          *
     ***************************************************************************/
    // someMongodbServer: {
    //     adapter: 'sails-mongo',
    //     host: 'localhost',
    //     port: 27017,
    //     // user: 'username',
    //     // password: 'password',
    //     // database: 'your_mongo_db_name_here'
    // },

    /***************************************************************************
     *                                                                          *
     * PostgreSQL is another officially supported relational database.          *
     * http://en.wikipedia.org/wiki/PostgreSQL                                  *
     *                                                                          *
     * Run: npm install sails-postgresql                                        *
     *                                                                          *
     *                                                                          *
     ***************************************************************************/
    // somePostgresqlServer: {
    //     user: 'postgres',
    //     password: '123456',
    //     database: 'postgres',
    //     options: {
    //         host: 'localhost',
    //         dialect: 'postgres',
    //         pool: {
    //             max: 5,
    //             min: 0,
    //             idle: 10000
    //         }
    //     }
    // }


    /***************************************************************************
     *                                                                          *
     * More adapters: https://github.com/balderdashy/sails                      *
     *                                                                          *
     ***************************************************************************/

    s3Bucket:{
                key: 'AKIAIM7PFH47KK5U4WKA',
                secret: '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',
                bucket: 'batua-test'
            },

    snsPlatformArn:{
                        PlatformApplicationArn:'arn:aws:sns:us-east-1:711489290099:app/GCM/Batua'
                    },

    ses:{
            "accessKeyId":"AKIAI7NWTVGO2FZZBX6Q",
            "secretAccessKey":"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",
            "region":"us-east-1"
        },
    
    url:"http://52.36.228.74:1337",

    razorpayKeyId:"rzp_test_tJrFA1TwhaOaOh",

    razorPayKeySecret:"PcbQ1tmnyfGmo2xvhefkOrJX"
};
