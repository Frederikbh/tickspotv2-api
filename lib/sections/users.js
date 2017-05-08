const request = require('request');
const _ = require('underscore');
const service = require('../service');

function addMethods(prototype) {

    prototype.getUsers = function (options, callback) {
        return this._get({
            paths: ['users'],
        }, options, callback);
    };
}


module.exports = addMethods;