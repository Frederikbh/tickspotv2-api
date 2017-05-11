const request = require('request');
const _ = require('underscore');
const service = require('./service');

class Tickspot {
    constructor(userAgent, subscriptionID, token, username, password) {
        this.userAgent = userAgent;
        this.subscriptionID = subscriptionID;
        this.token = token;
        this.username = username;
        this.password = password;
    }

    _get(url, options, callback) {
        [options, callback] = service.parseArguments(options, callback);
        const headers = service.extractHeaders(options);

        url.query = url.query || {};
        _.extendOwn(url.query, {
            page: service.extractPage((options))
        });
        const address = service.http(this, url);
        return service.makeRequest(this, service.AUTH_TOKEN, address, callback, options, headers);
    }

    _getAll(url, options, callback) {
        [options, callback] = service.parseArguments(options, callback);
        const headers = service.extractHeaders(options);
        url.query = url.query || {};
        const _this = this;

        const promise = new Promise(function (resolve, reject) {
            let entities = [];
            function get(page) {
                const urlCopy = _.extend({}, url);
                _.extendOwn(urlCopy.query, {
                    page: page
                });
                const address = service.http(_this, url);

                service
                    .makeRequest(_this, service.AUTH_TOKEN, address, null, options, headers)
                    .then(function (data) {
                        entities.push(...data);
                        if (data.length === 100) {
                            get(page + 1);
                        } else {
                            resolve([null, entities]);
                        }
                    }).catch(reject);
            }
            get(1);
        });

        return service.handleCallback(promise, callback);
    }

    _post(url, body, options, callback) {
        [options, callback] = service.parseArguments(options, callback);
        const headers = service.extractHeaders(options);

        options['Content-Type'] = 'application/json';
        options['json'] = true;
        options['method'] = 'POST';
        options['body'] = body;

        const address = service.http(this, url);
        return service.makeRequest(this, service.AUTH_TOKEN, address, callback, options, headers);
    }

    _put(url, body, options, callback) {
        [options, callback] = service.parseArguments(options, callback);
        const headers = service.extractHeaders(options);

        options['Content-Type'] = 'application/json';
        options['json'] = true;
        options['method'] = 'PUT';
        options['body'] = body;

        const address = service.http(this, url);
        return service.makeRequest(this, service.AUTH_TOKEN, address, callback, options, headers);
    }

    _delete(url, options, callback) {
        [options, callback] = service.parseArguments(options, callback);
        const headers = service.extractHeaders(options);

        options['method'] = 'DELETE';

        const address = service.http(this, url);
        return service.makeRequest(this, service.AUTH_TOKEN, address, callback, options, headers);
    }
}

// Clients API
require('./sections/clients')(Tickspot.prototype);

// Entries API
require('./sections/entries')(Tickspot.prototype);

// Projects API
require('./sections/projects')(Tickspot.prototype);

// Roles API
require('./sections/roles')(Tickspot.prototype);

// Tasks API
require('./sections/tasks')(Tickspot.prototype);

// Users API
require('./sections/users')(Tickspot.prototype);

module.exports = Tickspot;