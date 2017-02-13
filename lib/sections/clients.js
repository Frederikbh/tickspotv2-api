const request = require('request');
const _ = require('underscore');
const service = require('../service');

function addMethods(prototype) {

    prototype.getClients = function (options, callback) {
        this._get({
            paths: ['clients']
        }, options, callback);
    };

    prototype.getClient = function (clientID, options, callback) {
        this._get({
            paths: ['clients', clientID]
        }, options, callback);
    };

    prototype.createClient = function (client, options, callback) {
        this._post({
            paths: ['clients']
        }, client, options, callback);
    };

    prototype.updateClient = function (clientID, client, options, callback) {
        this._put({
            paths: ['clients', clientID]
        }, options, callback);
    };

    prototype.deleteClient = function (clientID, options, callback) {
        this._delete({
            paths: ['clients', clientID]
        }, options, callback);
    };
}

module.exports = addMethods;