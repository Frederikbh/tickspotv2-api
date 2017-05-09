const request = require('request');
const _ = require('underscore');
const service = require('../service');

function addMethods(prototype) {

    prototype.getUsers = function (options, callback) {
        return this._get({
            paths: ['users'],
            query: {
                page: service.extractPage(options)
            }
        }, options, callback);
    };
}


module.exports = addMethods;