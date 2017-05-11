function addMethods(prototype) {

    prototype.getClients = function (options, callback) {
        return this._get({
            paths: ['clients']
        }, options, callback);
    };

    prototype.getAllClients = function (options, callback) {
        return this._getAll({
            paths: ['clients']
        }, options, callback);
    };

    prototype.getClient = function (clientID, options, callback) {
        return this._get({
            paths: ['clients', clientID]
        }, options, callback);
    };

    prototype.createClient = function (client, options, callback) {
        return this._post({
            paths: ['clients']
        }, client, options, callback);
    };

    prototype.updateClient = function (clientID, client, options, callback) {
        return this._put({
            paths: ['clients', clientID]
        }, options, callback);
    };

    prototype.deleteClient = function (clientID, options, callback) {
        return this._delete({
            paths: ['clients', clientID]
        }, options, callback);
    };
}

module.exports = addMethods;