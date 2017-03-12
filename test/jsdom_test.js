var chai = require('chai');
var assert = chai.assert;

// Run some jQuery on a html fragment
var jsdom = require('jsdom');
jsdom.env('http://localhost:8080', [
  'http://code.jquery.com/jquery-1.5.min.js'
],
function(errors, window) {
	console.log(window.location.href);
	assert.equal(window.location.href, "http://localhost:8080/");

});