const request = require('request');
const _ = require('underscore');
const service = require('../service');

function addMethods(prototype) {

    // Get Roles
    prototype.getRoles = function(options, callback) {
        [options, callback] = service.parseArguments(options, callback);
        const headers = service.extractHeaders(options);

        const url = 'https://www.tickspot.com/api/v2/roles.json';
        service.makeRequest(this, service.AUTH_BASIC, url, options, headers).then(([err, body]) => {
            callback(err, body);
        })
    }
}

module.exports = addMethods;