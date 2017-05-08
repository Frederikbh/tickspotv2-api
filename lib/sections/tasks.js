const request = require('request');
const _ = require('underscore');
const service = require('../service');

function addMethods(prototype) {

    prototype.getTasks = function (options, callback) {
        return this._get({
            paths: ['tasks'],
        }, options, callback);
    };

    prototype.getProjectTasks = function (projectID, options, callback) {
        return this._get({
            paths: ['projects', projectID, 'tasks']
        }, options, callback);
    };

    prototype.getTask = function (taskID, options, callback) {
        return this._get({
            paths: ['tasks', taskID]
        }, options, callback);
    };

    prototype.createTask = function (task, options, callback) {
        return this._post({
            paths: ['tasks']
        }, task, options, callback);
    };

    prototype.updateTask = function (taskID, task, options, callback) {
        return this._put({
            paths: ['tasks', taskID]
        }, task, options, callback);
    };

    prototype.deleteTask = function (taskID, options, callback) {
        return this._delete({
            paths: ['tasks', taskID]
        }, options, callback);
    };
}

module.exports = addMethods;