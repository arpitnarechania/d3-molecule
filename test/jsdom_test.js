// Run using 1) /path/to/mocha test/jsdom_test.js
// 			 2) npm test test/jsdom_test.js
// With a python webserver running pointing to localhost:8080

var chai = require('chai');
var assert = chai.assert;

describe('Page Load', function() {

    it('correct URL on loading webapp', function() {
        // Run some jQuery on a html fragment
        var jsdom = require('jsdom');
        jsdom.env('http://localhost:8080', [
                'http://code.jquery.com/jquery-1.5.min.js'
            ],
            function(errors, window) {
                console.log(window.location.href);
                assert.equal(window.location.href, "http://localhost:8080/");

            });
    });
});