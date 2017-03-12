var chai = require('chai');
var assert = chai.assert;

describe('Page Load', function() {

  // it('default canvas width should be set', function() {
  // 	var defaultWidth = getCanvasWidth();
  //   assert.equal(defaultWidth, 500);
  // });

  // it('default canvas height should be set', function() {
  // 	var defaultHeight = getCanvasHeight();
  //   assert.equal(defaultHeight, 500);
  // });

  it('check if url loaded correctly', function() {
    // Run some jQuery on a html fragment
    var jsdom = require('jsdom');
    var url;
    jsdom.env('http://localhost:8080', [
      'http://code.jquery.com/jquery-1.5.min.js'
    ],
    function(errors, window) {
       url = window.location.href;
       assert.equal(url, "http://localhost:8080/");
      });
    });
});