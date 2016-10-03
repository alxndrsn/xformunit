var xformunit = require('../../src/js/xformunit');

describe('xformunit test framework', function() {

  beforeEach(xformunit.beforeEach);

  it('should throw an error when the requested form is not found', function() {
    return xformunit.loadForm('../res/missing.xml')
      .then(function() {
        fail('Loading a non-existent form should fail.');
      })
      .catch(function(err) {
        // expected
        expect(err.toString()).toBe('Error: error: Error: Invalid XML: Cannot GET /res/missing.xml');
      });
  });

  it('should throw an error when the requested form is poorly-formed', function() {
    return xformunit.loadForm('../res/badly-formed.xml')
      .then(function() {
        fail('Loading a file containing badly-formed XML should fail.');
      })
      .catch(function(err) {
        // expected
        // TODO we actually expect an error here, but until we can specify more
        // details that we expect, it's more useful to throw it and fail the
        // test.
        expect(err.toString()).toBe('Error: error: Error: Invalid XML: This is deliberately not XML.');
      });
  });

  it('should return happily when a form loads successfully', function() {
    return xformunit.loadForm('../res/simple.xml')
      .catch(function(err) {
        fail('No error expected, but got: ' + err);
      });
  });
});
