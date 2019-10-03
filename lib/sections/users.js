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

    prototype.getDeletedUsers = function (options, callback) {
        return this._get({
            paths: ['users', 'deleted']
        }, options, callback);
    } 

    prototype.getAllDeletedUsers = function (options, callback) {
        return this._getAll({
            paths: ['users', 'deleted']
        }, options, callback);
    }    
}


module.exports = addMethods;