'use strict';

function addMethods(prototype) {

    prototype.getProjects = function (options, callback) {
        return this._get({
            paths: ['projects']
        }, options, callback);
    };

    prototype.getAllProjects = function (options, callback) {
        return this._getAll({
            paths: ['projects']
        }, options, callback);
    };

    prototype.getClosedProjects = function (options, callback) {
        return this._get({
            paths: ['projects', 'closed']
        }, options, callback);
    };

    prototype.getAllClosedProjects = function (options, callback) {
        return this._getAll({
            paths: ['projects', 'closed']
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