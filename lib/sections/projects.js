const request = require('request');
const _ = require('underscore');
const service = require('../service');

function addMethods(prototype) {

    prototype.getProjects = function (options, callback) {
        return this._get({
            paths: ['projects'],
            query: {
                page: service.extractPage(options)
            }
        }, options, callback);
    };

    prototype.getClosedProjects = function (options, callback) {
        return this._get({
            paths: ['projects', 'closed'],
            query: {
                page: service.extractPage(options)
            }
        }, options, callback);
    };

    prototype.getProject = function (projectID, options, callback) {
        return this._get({
            paths: ['projects', projectID],
        }, options, callback);
    };

    prototype.createProject = function (project, options, callback) {
        return this._post({
            paths: ['projects']
        }, project, options, callback);
    };

    prototype.updateProject = function (projectID, project, options, callback) {
        return this._put({
            paths: ['projects', projectID]
        }, project, options, callback);
    };

    prototype.deleteProject = function (projectID, options, callback) {
        return this._delete({
            paths: ['projects', projectID]
        }, options, callback);
    };
}

module.exports = addMethods;