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
      .catch(xformunit.unexpected);
  });

  it('should allow filling of textfields in a form', function() {
    return xformunit.loadForm('../res/simple.xml')
      .then(function() {

        return xformunit.get('/data/datum');
      })
      .then(function(text) {
        expect(text).toBe('');

        return xformunit.set('/data/datum', 'some-value');
      })
      .then(function() {

        return xformunit.get('/data/datum');
      })
      .then(function(text) {
        expect(text).toBe('some-value');

      })
      .catch(xformunit.unexpected);
  });

  it('should update calculations relevant to a changed field', function() {
    return xformunit.loadForm('../res/reverser.xml')
      .then(function() {

        return xformunit.get('/data/original');
      })
      .then(function(text) {
        expect(text).toBe('');

        return xformunit.get('/data/reversed');
      })
      .then(function(text) {
        expect(text).toBe('');

        return xformunit.set('/data/original', 'abc123');
      })
      .then(function() {

        return xformunit.get('/data/reversed');
      })
      .then(function(text) {
        expect(text).toBe('321cba');

      })
      .catch(xformunit.unexpected);
  });
});
