// include
const app = require('../app');
var expect = require('chai').expect;
const request = require('supertest');

// test routes
describe('Routes', function() {

    // index.js
    describe('index.js', function() {
        // '/'
        describe('\'/\'', function() {
            // test
            it('should return a 200 response', function(done) {
                request(app)
                .get('/')
                .expect(200, done)
            });
        });
        // '/login'
        describe('\'/login\'', function() {
            // test
            it('should return a 200 response', function(done) {
                request(app)
                .get('/login')
                .expect(200, done)
            });
        });
        // '/signup'
        describe('\'/signup\'', function() {
            // test
            it('should return a 200 response', function(done) {
                request(app)
                .get('/signup')
                .expect(200, done)
            });
        });
    });
});
