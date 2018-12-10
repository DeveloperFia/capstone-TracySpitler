// include
const app = require('../app');
var expect = require('chai').expect;
const request = require('supertest');

// test routes
describe('Routes', function() {
    // non-existant route
    describe('non-existant route', function() {
        // test
        it('should return a 404 response', function(done) {
            request(app)
                .get('/nope')
                .expect(404, done)
        });
    });

    // index.js
    describe('index.js', function() {
        // '/'
        describe('\'/\'', function() {
            // test for 200
            it('should return a \'302 found\' response', function(done) {
                request(app)
                    .get('/')
                    .expect(302, done)
            });
            // test redirect
            it('no user - should redirect to /start', function(done) {
                request(app)
                    .get('/')
                    .expect('Location', '/start')
                    .expect(302, done)
            });
        });
        // '/start'
        describe('\'/start\'', function() {
            // test
            it('should return a 200 response', function(done) {
                request(app)
                    .get('/start')
                    .expect(200, done)
            });
        });
    }); // end index.js

    // lists.js
    describe('lists.js', function() {
        // '/lists'
        describe('\'/lists\'', function() {
            // test
            it('should return a 200 response', function(done) {
                request(app)
                    .get('/lists')
                    .expect(200, done)
            });
        });
    }); // end lists.js

});
