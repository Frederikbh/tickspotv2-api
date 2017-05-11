function addMethods(prototype) {

    prototype.getEntries = function (query, options, callback) {
        return this._get({
            paths: ['entries'],
            query: query
        }, options, callback);
    };

    prototype.getAllEntries = function (query, options, callback) {
        return this._getAll({
            paths: ['entries'],
            query: query
        }, options, callback);
    };

    prototype.getUserEntries = function (userID, query, options, callback) {
        return this._get({
            paths: ['users', userID, 'entries'],
            query: query
        }, options, callback);
    };

    prototype.getAllUserEntries = function (userID, query, options, callback) {
        return this._getAll({
            paths: ['users', userID, 'entries'],
            query: query
        }, options, callback);
    };

    prototype.getProjectEntries = function (projectID, query, options, callback) {
        return this._get({
            paths: ['projects', projectID, 'entries'],
            query: query
        }, options, callback);
    };

    prototype.getAllProjectEntries = function (projectID, query, options, callback) {
        return this._getAll({
            paths: ['projects', projectID, 'entries'],
            query: query
        }, options, callback);
    };

    prototype.getTaskEntries = function (taskID, query, options, callback) {
        return this._get({
            paths: ['tasks', taskID, 'entries'],
            query: query
        }, options, callback);
    };

    prototype.getAllTaskEntries = function (taskID, query, options, callback) {
        return this._getAll({
            paths: ['tasks', taskID, 'entries'],
            query: query
        }, options, callback);
    };

    prototype.getEntry = function (entryID, options, callback) {
        return this._get({
            paths: ['entries', entryID]
        }, options, callback);
    };

    prototype.createEntry = function (entry, options, callback) {
        return this._post({
            paths: ['entries']
        }, entry, options, callback);
    };

    prototype.updateEntry = function (entryID, entry, options, callback) {
        return this._put({
            paths: ['entries', entryID]
        }, entry, options, callback);
    };

    prototype.deleteEntry = function (entryID, options, callback) {
        return this._delete({
            paths: ['entries', entryID]
        }, options, callback);
    };
}

module.exports = addMethods;