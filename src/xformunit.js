var fs = require('fs'),
    EnketoForm = require('enketo-core'),
    XformunitForm = require('./xformunit_form');

function loadForm(path, formSelector) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8', function(err, xml) {
      console.log('readFile() returned', err, xml);
      if(err) return reject(err);

      var data = {
        modelStr: xml,
        instanceStr: null,
        submitted: false,
        external: [],
      };

      var enketoForm = new EnketoForm(formSelector, data);
      var loadErrors = enketoForm.init();

      if(loadErrors && loadErrors.length) {
        reject(loadErrors);
      }

      resolve(new XformunitForm(enketoForm));
    });
  });
}

function fixEnketoConfig(configPath) {
  // monkey business to fake node module loading for text!enketo-config - IRL
  // this is aliased in browserify, but node doesn't allow doing this without
  // some trickery, which follows:
  require(configPath);
  require.cache[require.resolve('text!enketo-config')] =
  require.cache[require.resolve(configPath)];
}

module.exports = {
  fakeEnketoConfig: fakeEnketoConfig,
  loadForm: loadForm,
};
