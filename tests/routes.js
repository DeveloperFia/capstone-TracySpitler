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

    // public.js
    describe('public.js', function() {
        // '/'
        describe('\'/\'', function() {
            // test for 200
            it('should return a \'302 found\' response', function(done) {
                request(app)
                    .get('/')
                    .expect(302, done)
            });
        });
    }); // end public.js

});

process.exit();
