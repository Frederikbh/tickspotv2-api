'use strict';

function addMethods(prototype) {

    prototype.getUsers = function (options, callback) {
        return this._get({
            paths: ['users']
        }, options, callback);
    };

    prototype.getAllUsers = function (options, callback) {
        return this._getAll({
            paths: ['users']
        }, options, callback);
    }
}


module.exports = addMethods;