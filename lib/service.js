'use strict';

const request = require('request');
const _ = require('underscore');

const btoa = str => new Buffer(str).toString('base64');

const AUTH_TOKEN = 0;
const AUTH_BASIC = 1;

// Gets the correctly formatted authorization header
function getAuthorization(user, auth) {
    if (auth === AUTH_BASIC) {
        return 'Basic ' + btoa(user.username + ':' + user.password);
    } else if (auth === AUTH_TOKEN) {
        return 'Token token=' + user.token;
    }
}

// Creates the params object for the request
function getParams(user, auth, url, options, headers) {
    return Object.assign({
        url: url,
        headers: Object.assign({
            'User-Agent': user.userAgent,
            'Authorization': getAuthorization(user, auth)
        }, headers)
    }, options);
}

// Makes the http request
function makeRequest(user, auth, url, cb, options = {}, headers = {}) {
    const params = getParams(user, auth, url, options, headers);

    const promise = new Promise((resolve, reject) => {
        request(params, (err, response, body) => {
            if (!err && [200, 201, 204, 301].includes(response.statusCode)) {
                const result = _.isString(body) ? JSON.parse(body) : body;
                return resolve([undefined, result]);
            } else {
                if (cb) {
                    return resolve([err || body]);
                }
                return reject([err || body]);
            }
        });
    });
    return handleCallback(promise, cb);
}

function handleCallback(req, cb) {
    if (cb) {
        return req.then(([err, body]) => cb(err, body));
    }
    return req.then(([err, body]) => {
        return new Promise((resolve, reject) => {
            if (err) {
                return reject(err);
            }
            return resolve(body);
        });
    });
}

// Extract headers from options object
function extractHeaders(options) {
    let headers = {};
    if (options && options.headers) {
        headers = options.headers;
        delete options.headers;
    }
    return headers;
}

// Parses arguments provided, makes it possible to only apply a callback function
function parseArguments(options, callback) {
    if (_.isUndefined(options) && _.isUndefined(callback)) { // No params
        return [{}, undefined];
    }
    if (!_.isUndefined(options) && _.isFunction(options)) { // Only callback param
        callback = options;
        options = {};
    }
    return [options, callback]; // Both params
}

// Formats the url
function http(tick, args) {
    let url = 'https://www.tickspot.com/' + tick.subscriptionID + '/api/v2/';
    url += args.paths.join('/') + '.json';
    if (args.query) {
        url += '?';
        url += _.pairs(args.query).map(p => p.join('=')).join('&');
    }
    return url;
}

// Extracts page from options
function extractPage(options) {
    let page = 1;
    if (options && options.page) {
        page = options.page;
        delete options.page;
    }
    return page;
}

module.exports = {
    AUTH_TOKEN: AUTH_TOKEN,
    AUTH_BASIC: AUTH_BASIC,
    makeRequest: makeRequest,
    handleCallback: handleCallback,
    extractHeaders: extractHeaders,
    extractPage: extractPage,
    parseArguments: parseArguments,
    http: http
};