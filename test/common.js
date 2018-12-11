'use strict';
const sinonChai = require( 'sinon-chai' );
const Service   = require( '../lib/service' ); 
global.chai     = require( 'chai' );
global.sinon    = require( 'sinon' );
global.expect   = global.chai.expect;

chai.use(sinonChai);

sinon.stub(Service, 'makeRequest')
.callsFake((user, auth, url, cb, options = {}, headers = {}) => {

	const promise = new Promise((resolve, reject) => {
		return resolve([undefined, [user, auth, url, cb, options, headers]]);
	});

	return Service.handleCallback(promise, cb);
});
