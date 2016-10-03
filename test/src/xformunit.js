var xformunit = require('../../src/js/xformunit');

function TODO() {
  fail('Not yet implemented.');
}

describe('xformunit test framework', function() {

  beforeEach(xformunit.beforeEach);

  it('should throw an error when the requested form is not found', function() {
    return xformunit.loadForm('../res/missing.xml')
      .then(function() {
        fail('Loading a non-existent form should fail.');
      })
      .catch(function(err) {
        console.log('Test caught err:', err);
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
        expect(err.toString()).toBe('Error: error: Error: Invalid XML: This is deliberately not XML.');
      });
  });

  it('should return happily when a form loads successfully', function() {
    return xformunit.loadForm('../res/simple.xml')
      .catch(function(err) {
        fail('No error expected, but got: ' + err);
      });
  });

  it('should allow filling of textfields in a form', function() {
    TODO();
  });

  it('should update calculations relevant to a changed field', function() {
    TODO();
  });
});
