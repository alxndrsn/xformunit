var xformunit,
    assert = require('chai').assert;

describe('xformunit', function() {

  describe('loadForm()', function() {

    var formSelector = '#form-container';

    beforeEach(function(done) {
      require('jsdom').env(
        '<div id="form-container"></div>',
        function(err, window) {
          if(err) return done(err);

          // clear require's cache, and insert a version of jquery which is
          // bound to our DOM.  We need to do this before we load enketo-core
          // via require('xformunit').
          delete require.cache[require.resolve('jquery')];
          require('jquery');
          console.log('jquery cache is now:', require.cache[require.resolve('jquery')]);
          require.cache[require.resolve('jquery')].exports = require('jquery')(window);
          console.log('jquery is now:', require('jquery'));
          xformunit = require('../src/xformunit');
          xformunit.fakeEnketoConfig('./res/enketo-config.json');

          done();
        });
    });

    it('should return an error if form does not exist', function() {
      // given
      // a form path which does not exist
      var path = 'missing.xml';

      // when
      // xformunit is instructed to load the form
      return xformunit.loadForm(path, formSelector)

        .then(function() {
          throw new Error('form should not have loaded');
        })

        .catch(function(err) {

          // then
          // a useful error is thrown
          assert.ok(err);
          assert.equal(err.message, 'ENOENT: no such file or directory, open \'missing.xml\'');

        });
    });

    it('should return an error if form is poorly formed', function() {
      // given
      // a form path which points to badly-formed XML
      var path = __dirname + '/res/badly-formed.xml';

      // when
      // xformunit is instructed to load the form
      return xformunit.loadForm(path)

        .then(function() {
          throw new Error('form should not have loaded');
        })

        .catch(function(err) {

          // then
          // a useful error is thrown
          assert.ok(err);
          assert.equal(err.message, 'Xform failed to parse.');

        });
    });

    it('should return an xformunit Form object if form loads OK', function() {
      // given
      // a form path which points to a real form
      var path = __dirname + '/res/empty-form.xml';

      // when
      // xformunit is instructed to load the form
      return xformunit.loadForm(path)

        .then(function(form) {

          // then
          // a XformunitForm is returned
          assert.ok(form);
          assert.ok(form instanceof XformunitForm);

        })

        .catch(function(err) {

          throw new Error('Unexpected error: ' + JSON.stringify(err));

        });
    });

  });

  describe('XformunitForm', function() {
    it.skip('should update model when a text field is set', function() {});
    it.skip('should update model for a calculated field', function() {});
    it.skip('should update visibility of a field depending on "relevant" attribute', function() {});
  });

});
