var xformunit = require('../../src/js/xformunit');

describe('xformunit test framework', function() {
  it('should throw an error when the requested form is not found', function() {
    return xformunit.loadForm('../res/missing.xml')
      .then(function() {
        throw new Error('Loading a non-existent form should fail.');
      })
      .catch(function(err) {
        // expected
        // TODO we actually expect an error here, but until we can specify more
        // details that we expect, it's more useful to throw it and fail the
        // test.
        throw err;
      });
  });
  it('should throw an error when the requested form is poorly-formed', function() {
    return xformunit.loadForm('../res/badly-formed.xml')
      .then(function() {
        throw new Error('Loading a file containing badly-formed XML should fail.');
      })
      .catch(function(err) {
        // expected
        // TODO we actually expect an error here, but until we can specify more
        // details that we expect, it's more useful to throw it and fail the
        // test.
        throw err;
      });
  });
  it('should return happily when a form loads successfully', function() {
    return xformunit.loadForm('../res/simple.xml');
  });
});
