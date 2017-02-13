const request = require('request');
const _ = require('underscore');
const service = require('./service');

function Tickspot(userAgent, subscriptionID, token, username, password) {
    this.userAgent = userAgent;
    this.subscriptionID = subscriptionID;
    this.token = token;
    this.username = username;
    this.password = password;
}

Tickspot.prototype._get = function (url, options, callback) {
    [options, callback] = service.parseArguments(options, callback);
    const headers = service.extractHeaders(options);

    const address = service.http(this, url);
    service.makeRequest(this, service.AUTH_TOKEN, address, options, headers)
        .then(([err, body]) => {
            callback(err, body);
        })
};

Tickspot.prototype._post = function (url, body, options, callback) {
    [options, callback] = service.parseArguments(options, callback);
    const headers = service.extractHeaders(options);

    options['Content-Type'] = 'application/json';
    options['json'] = true;
    options['method'] = 'POST';
    options['body'] = body;

    const address = service.http(this, url);
    service.makeRequest(this, service.AUTH_TOKEN, address, options, headers)
        .then(([err, body]) => {
            callback(err, body);
        })
};

Tickspot.prototype._put = function (url, body, options, callback) {
    [options, callback] = service.parseArguments(options, callback);
    const headers = service.extractHeaders(options);

    options['Content-Type'] = 'application/json';
    options['json'] = true;
    options['method'] = 'PUT';
    options['body'] = body;

    const address = service.http(this, url);
    service.makeRequest(this, service.AUTH_TOKEN, address, options, headers)
        .then(([err, body]) => {
            callback(err, body);
        })
};

Tickspot.prototype._delete = function (url, options, callback) {
    [options, callback] = service.parseArguments(options, callback);
    const headers = service.extractHeaders(options);

    options['method'] = 'DELETE';

    const address = service.http(this, url);
    service.makeRequest(this, service.AUTH_TOKEN, address, options, headers)
        .then(([err, body]) => {
            callback(err, body);
        })
};

// Roles API
require('./sections/roles')(Tickspot.prototype);

// Clients API
require('./sections/clients')(Tickspot.prototype);

// Projects API
require('./sections/projects')(Tickspot.prototype);

module.exports = Tickspot;