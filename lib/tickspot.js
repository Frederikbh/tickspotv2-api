'use strict';

const assert  = require('assert');
const request = require('request');
const service = require('./service');

class Tickspot {
    constructor(userAgent, subscriptionID, token = null, username = null, password = null) {
        assert('string' === typeof userAgent, 'You must supply a userAgent' );
        assert('number' === typeof subscriptionID, 'You must supply a tickpost tenant id number');

        if(!token) {
            assert('string' === typeof username, 'You must supply a username' );            
            assert('string' === typeof password, 'You must supply a password' );                        
        }

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
        Object.assign(url.query, {
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
                const urlCopy = Object.assign({}, url);
                Object.assign(urlCopy.query, {
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