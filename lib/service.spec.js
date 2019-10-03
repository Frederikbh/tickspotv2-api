'use strict';
const Service = require( './service' );

const user = {
	'username': 'test',
	'password': 'password',
	'token':    'token'
};

const tick = {
	subscriptionID: 12345
};


describe( 'Tick Service Functions', function() {

	it( 'handleCallback Resolved Promise', async function() {
		const p   = Promise.resolve([null, 'ok']);
		const res = await Service.handleCallback(p);
		expect(res).to.equal('ok');
	});

	it( 'handleCallback Rejected Promise', async function() {
		const err = new Error('this should reject');
		try {
			const p   = Promise.resolve([err, null]);
			const res = await Service.handleCallback(p);			
		}
		catch(e) {
			expect(e).to.equal(err);
		}
	});

	it( 'handleCallback Resolved Callback', async function() {
		const p  = Promise.resolve([null, 'ok']);				
		const cb = sinon.spy();
		await Service.handleCallback(p, cb);
		expect(cb).to.have.been.calledWith(null, 'ok');
	});

	it( 'handleCallback Rejected Callback', async function() {
		const err = new Error('this should reject');
		const cb  = sinon.spy();		
		try {
			const p = Promise.resolve([err, null]);
			await Service.handleCallback(p, cb);			
		}
		catch(e) {
			expect(cb).to.have.been.calledWith(err, null);
		}
	});

	it( 'extractsHeaders to empty object', function() {
		const res = Service.extractHeaders();
		expect(res).to.be.an('object');
	});

	it( 'extractsHeaders to be an object with props', function() {
		const opts = { headers: { method: 'GET' } }; 
		const res  = Service.extractHeaders(opts);
		expect(res).to.include({ method: 'GET' });
		expect(opts).to.not.have.property('headers');
	});

	it( 'parseArguments for no args', function() {
		const res  = Service.parseArguments();
		expect(res[0]).to.be.an('object');
		expect(res[1]).to.be.an('undefined');
	});

	it( 'parseArguments for callback only', function() {
		const cb  = () => {}; 
		const res = Service.parseArguments(cb);
		expect(res[0]).to.be.an('object');
		expect(res[1]).to.equal(cb);
	});

	it( 'parseArguments for options and callback', function() {
		const opt = {}; 
		const cb  = () => {}; 
		const res = Service.parseArguments(opt, cb);
		expect(res[0]).to.equal(opt);
		expect(res[1]).to.equal(cb);
	});

	it( 'http returns url only', function() {
		const args = {paths: ['entries'] }; 
		const res  = Service.http(tick, args);
		expect(res).to.equal('https://www.tickspot.com/' + tick.subscriptionID + '/api/v2/entries.json')
	});

	it( 'http returns url with query', function() {
		const args = {paths: ['entries'], query: { page: 1} }; 
		const res  = Service.http(tick, args);
		expect(res).to.equal('https://www.tickspot.com/' + tick.subscriptionID + '/api/v2/entries.json?page=1')
	});
});
