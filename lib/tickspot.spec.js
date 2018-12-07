'use strict';
const Tick = require( './tickspot' );

const userAgent = 'userAgent';

const subscriptionID = 12345;

const token = 'jwt';

const username = 'tick@tickspot.com';

const password = '123abcd';

describe( 'Tickspot API', function() {

	it( 'Constructor throws if a userAgent is not provided', function() {
		expect(() => new Tick()).to.throw('You must supply a userAgent');
	});

	it( 'Constructor throws if a subscriptionID is not provided', function() {
		expect(() => new Tick(userAgent)).to.throw('You must supply a tickpost tenant id number');
	});

	it( 'Constructor throws if a token is not used and username is not supplied', function() {
		expect(() => new Tick(userAgent, subscriptionID)).to.throw('You must supply a username');
	});

	it( 'Constructor throws if a token is not used and password is not supplied', function() {
		expect(() => new Tick(userAgent, subscriptionID, null, username)).to.throw('You must supply a password');
	});	

	it( 'Constructs a new tickspot using a token', function() {
		const tick = new Tick(userAgent, subscriptionID, token);
		expect(tick).to.be.instanceof(Tick);
		expect(tick.userAgent).to.equal(userAgent);
		expect(tick.subscriptionID).to.equal(subscriptionID);
		expect(tick.token).to.equal(token);
		expect(tick.username).to.be.null;
		expect(tick.password).to.be.null;		
	});

	it( 'Constructs a new tickspot using a username and password', function() {
		const tick = new Tick(userAgent, subscriptionID, null, username, password);
		expect(tick).to.be.instanceof(Tick);
		expect(tick.userAgent).to.equal(userAgent);
		expect(tick.subscriptionID).to.equal(subscriptionID);
		expect(tick.token).to.null;
		expect(tick.username).to.equal(username);
		expect(tick.password).to.equal(password);
	});	

	it( 'Makes a _get promise request', async function() {
		const tick = new Tick(userAgent, subscriptionID, token);		
		const [user, auth, url, cb, options, headers] = await tick._get({
			paths:['entries'], 
			query: {
		    start_date: '2016-01-01',
		    end_date: '2016-02-01',
		    billable: true,
		    project_id: 20,
				updated_at: '2018-12-07'		    	
			}
		});
		expect(user).to.equal(tick);
		expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries.json?start_date=2016-01-01&end_date=2016-02-01&billable=true&project_id=20&updated_at=2018-12-07&page=1');
		expect(cb).to.be.an('undefined');
		expect(options).to.be.an('object');
		expect(headers).to.be.an('object');		
	});

	it( 'Makes a _get request with a callback', function(done) {
		const tick = new Tick(userAgent, subscriptionID, token);		
		tick._get({
			paths:['entries'], 
			query: {
		    start_date: '2016-01-01',
		    end_date: '2016-02-01',
		    billable: true,
		    project_id: 20,
				updated_at: '2018-12-07'		    	
			}
		}, null, (err, [user, auth, url, cb, options, headers]) => {
			expect(user).to.equal(tick);
			expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries.json?start_date=2016-01-01&end_date=2016-02-01&billable=true&project_id=20&updated_at=2018-12-07&page=1');
			expect(cb).to.be.an('function');
			expect(options).to.be.null;
			expect(headers).to.be.an('object');	
			done();			
		});
	});

	it( 'Makes a _getAll promise request', async function() {
			const tick = new Tick(userAgent, subscriptionID, token);				
			const [user, auth, url, cb, options, headers] = await tick._getAll({
				paths:['entries'], 
				query: {
			    start_date: '2016-01-01',
			    end_date: '2016-02-01',
			    billable: true,
			    project_id: 20,
					updated_at: '2018-12-07'		    	
				}
			});
			expect(user).to.equal(tick);
			expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries.json?start_date=2016-01-01&end_date=2016-02-01&billable=true&project_id=20&updated_at=2018-12-07&page=1');
			expect(cb).to.be.an('null');
			expect(options).to.be.an('object');
			expect(headers).to.be.an('object');	
	});

	it( 'Makes a _getAll request with a callback', function(done) {
		const tick = new Tick(userAgent, subscriptionID, token);		
		tick._getAll({
			paths:['entries'], 
			query: {
		    start_date: '2016-01-01',
		    end_date: '2016-02-01',
		    billable: true,
		    project_id: 20,
				updated_at: '2018-12-07'		    	
			}
		}, null, (err, [user, auth, url, cb, options, headers]) => {
			expect(user).to.equal(tick);
			expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries.json?start_date=2016-01-01&end_date=2016-02-01&billable=true&project_id=20&updated_at=2018-12-07&page=1');
			expect(cb).to.be.null;
			expect(options).to.be.null;
			expect(headers).to.be.an('object');	
			done();			
		});
	});	

	it( 'Makes a _post promise request', async function() {
		const body = {
		  "date":"2014-09-18",
		  "hours":1.5,
		  "notes":"Chasing Ewoks",
		  "task_id":24,
		  "user_id":4
		};
		const tick = new Tick(userAgent, subscriptionID, token);		
		const [user, auth, url, cb, options, headers] = await tick._post({
				paths:['entries']
			}, body);
			expect(user).to.equal(tick);
			expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries.json');
			expect(cb).to.be.an('undefined')
			expect(options['Content-Type']).to.be.equal('application/json');
			expect(options.json).to.be.true;
			expect(options.method).to.equal('POST');
			expect(options.body).to.equal(body);
			expect(headers).to.be.an('object');	
	});

	it( 'Makes a _post callback request', function(done) {
		const body = {
		  "date":"2014-09-18",
		  "hours":1.5,
		  "notes":"Chasing Ewoks",
		  "task_id":24,
		  "user_id":4
		};
		const tick = new Tick(userAgent, subscriptionID, token);		
		tick._post({
				paths:['entries']
			}, body, (err, [user, auth, url, cb, options, headers]) => {
				expect(user).to.equal(tick);
				expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries.json');
				expect(cb).to.be.an('function')
				expect(options['Content-Type']).to.be.equal('application/json');
				expect(options.json).to.be.true;
				expect(options.method).to.equal('POST');
				expect(options.body).to.equal(body);
				expect(headers).to.be.an('object');	
				done();
			});
	});	

	it( 'Makes a _put promise request', async function() {
		const body = {
		  "date":"2014-09-18",
		  "hours":1.5,
		  "notes":"Chasing Ewoks",
		  "task_id":24,
		  "user_id":4
		};
		const tick = new Tick(userAgent, subscriptionID, token);		
		const [user, auth, url, cb, options, headers] = await tick._put({
				paths:['entries']
			}, body);
			expect(user).to.equal(tick);
			expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries.json');
			expect(cb).to.be.an('undefined')
			expect(options['Content-Type']).to.be.equal('application/json');
			expect(options.json).to.be.true;
			expect(options.method).to.equal('PUT');
			expect(options.body).to.equal(body);
			expect(headers).to.be.an('object');	
	});

	it( 'Makes a _put callback request', function(done) {
		const body = {
		  "date":"2014-09-18",
		  "hours":1.5,
		  "notes":"Chasing Ewoks",
		  "task_id":24,
		  "user_id":4
		};
		const tick = new Tick(userAgent, subscriptionID, token);		
		tick._put({
				paths:['entries']
			}, body, (err, [user, auth, url, cb, options, headers]) => {
				expect(user).to.equal(tick);
				expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries.json');
				expect(cb).to.be.an('function')
				expect(options['Content-Type']).to.be.equal('application/json');
				expect(options.json).to.be.true;
				expect(options.method).to.equal('PUT');
				expect(options.body).to.equal(body);
				expect(headers).to.be.an('object');	
				done();
			});
	});		

	it( 'Makes a _delete promise request', async function() {
		const tick = new Tick(userAgent, subscriptionID, token);		
		const [user, auth, url, cb, options, headers] = await tick._delete({
			paths:['entries', 123]
		});		
		expect(user).to.equal(tick);
		expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries/123.json');
		expect(cb).to.be.an('undefined')
		expect(options.method).to.equal('DELETE');
		expect(headers).to.be.an('object');			
	});

	it( 'Makes a _delete callback request', function(done) {
		const tick = new Tick(userAgent, subscriptionID, token);		
		tick._delete({
			paths:['entries', 123]
		}, (err, [user, auth, url, cb, options, headers]) => {
			expect(user).to.equal(tick);
			expect(url).to.equal('https://www.tickspot.com/12345/api/v2/entries/123.json');
			expect(cb).to.be.an('function')
			expect(options.method).to.equal('DELETE');
			expect(headers).to.be.an('object');		
			done();
		});		
	
	});
});