   var express = require('express'),
       bodyParser = require('body-parser'),
       oauthserver = require('oauth2-server');

   module.exports = {

       http: {

           customMiddleware: function(app) {

               app.use(bodyParser.urlencoded({
                   extended: true
               }));

               app.use(bodyParser.json());

               app.oauth = oauthserver({
                   model: require('./oauth2Model'), // See below for specification
                   grants: ['authorizationCode', 'password', 'refreshToken'],
                   debug: true
               });

               // Handle token grant requests
               app.all('/oauth/authenticate', app.oauth.grant());

               // Error handling
               app.use(app.oauth.errorHandler());
           }
       }
   };
