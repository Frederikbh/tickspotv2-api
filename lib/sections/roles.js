const request = require('request');
const _ = require('underscore');
const service = require('../service');

function addMethods(prototype) {

    // Get Roles
    prototype.getRoles = function(options, callback) {
        [options, callback] = service.parseArguments(options, callback);
        const headers = service.extractHeaders(options);

        const url = 'https://www.tickspot.com/api/v2/roles.json';
        return service.makeRequest(this, service.AUTH_BASIC, url, callback, options, headers);
    };
}

module.exports = addMethods;