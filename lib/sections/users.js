const request = require('request');
const _ = require('underscore');
const service = require('../service');

function addMethods(prototype) {

    prototype.getUsers = function (options, callback) {
        this._get({
            paths: ['users'],
        }, options, callback);
    };
}


module.exports = addMethods;