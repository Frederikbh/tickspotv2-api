const request = require('request');
const _ = require('underscore');

const btoa = str => new Buffer(str).toString('base64');

const AUTH_TOKEN = 0;
const AUTH_BASIC = 1;

function getParams(user, auth, url, options, headers) {
    return _.extend({
        url: url,
        headers: _.extend({
            'User-Agent': user.userAgent,
            'Authorization': getAuthorization(user, auth)
        }, headers)
    }, options);
}

function getAuthorization(user, auth) {
    if(auth === AUTH_BASIC) {
        return 'Basic ' + btoa(user.username + ':' + user.password);
    } else if(auth === AUTH_TOKEN) {
        return 'Token token=' + user.token;
    }
}

function makeRequest(user, auth, url, options = {}, headers = {}) {
    const params = getParams(user, auth, url, options, headers);

    return new Promise((resolve, reject) => {
        request(params, (err, response, body) => {
            if (!err && [200, 201, 204, 301].indexOf(response.statusCode) > -1) {
                const result = _.isString(body) ? JSON.parse(body) : body;
                resolve([undefined, result]);
            } else {
                console.log('ERR ' + response.statusCode + ':', body);
                reject([err || body]);
            }
        });
    });
}

function extractHeaders(options) {
    let headers = {};
    if(options && options.headers) {
        headers = options.headers;
        delete options.headers;
    }
    return headers;
}

function parseArguments(options, callback) {
    if(_.isUndefined(options) && _.isUndefined(callback)) { // No params
        return [{}, undefined];
    }
    if (!_.isUndefined(options) && _.isFunction(options)) { // Only callback param
        callback = options;
        options = {};
    }
    return [options, callback]; // Both params
}

function http(tick, args) {
    let url = 'https://www.tickspot.com/' + tick.subscriptionID + '/api/v2/';
    url += args.paths.join('/') + '.json';
    if(args.query) {
        url += '?';
        url += _.pairs(args.query).map(p => p.join('=')).join('&');
    }
    return url;
}

module.exports = {
    AUTH_TOKEN: AUTH_TOKEN,
    AUTH_BASIC: AUTH_BASIC,
    btoa: btoa,
    getParams: getParams,
    getAuthorization: getAuthorization,
    makeRequest: makeRequest,
    extractHeaders: extractHeaders,
    parseArguments: parseArguments,
    http: http
};