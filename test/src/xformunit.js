var xformunit = require('../../src/js/xformunit');

describe('xformunit test framework', function() {
  it('should throw an error when the requested form is not found', function() {
  });
  it('should throw an error when the requested form is poorly-formed', function() {
  });
  it('should return happily when a form loads successfully', function() {
    return xformunit.loadForm('../res/simple.xml');
  });
});
