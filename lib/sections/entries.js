const request = require('request');
const _ = require('underscore');
const service = require('../service');

function addMethods(prototype) {

    prototype.getEntries = function (query, options, callback) {
        this._get({
            paths: ['entries'],
            query: query
        }, options, callback);
    };

    prototype.getUserEntries = function (userID, query, options, callback) {
        this._get({
            paths: ['users', userID, 'entries'],
            query: query
        }, options, callback);
    };

    prototype.getProjectEntries = function (projectID, query, options, callback) {
        this._get({
            paths: ['projects', projectID, 'entries'],
            query: query
        }, options, callback);
    };

    prototype.getTaskEntries = function (taskID, query, options, callback) {
        this._get({
            paths: ['tasks', taskID, 'entries'],
            query: query
        }, options, callback);
    };

    prototype.getEntry = function (entryID, options, callback) {
        this._get({
            paths: ['entries', entryID]
        }, options, callback);
    };

    prototype.createEntry = function (entry, options, callback) {
        this._post({
            paths: ['entries']
        }, entry, options, callback);
    };

    prototype.updateEntry = function (entryID, entry, options, callback) {
        this._put({
            paths: ['entries', entryID]
        }, options, callback);
    };

    prototype.deleteEntry = function (entryID, options, callback) {
        this._delete({
            paths: ['entries', entryID]
        }, options, callback);
    };
}

module.exports = addMethods;