window.$ = window.jQuery = require('jquery');
var xslt = require('./xslt');
require('enketo-core');
var request = require('request');
var url = require('url');

var Form = require('enketo-core');
var formSelector = '#form-container';

var location = url.parse(window.location.href);
var formPath = location.query && location.query.split('&').find(function(param) { return param.indexOf('form=') === 0; });
formPath = formPath && absolute(formPath.split('=', 2)[1]);

function absolute(relative) {
  return url.resolve(window.location.href, relative);
}

function setStatus(status) {
  console.log('Updating status to: ' + status);
  $('#xformunit-loading').text(status);
}

if(!formPath) {
  return setStatus('error: no `form` request variable was set');
}

setStatus('Requesting form XML from: ' + formPath);
request(formPath, function(err, res, formXml) {
  if(err) {
    console.log('Failed to load form from ' + formPath, err);
    setStatus('error: ' + err + ' [' + JSON.stringify(err) + '] res=' + JSON.stringify(res));
    return;
  }

  xslt(formXml, absolute('./xsl/openrosa2html5form.xsl'))
    .then(function(html) {
      jQuery(formSelector).append(html);

      return xslt(formXml, absolute('./xsl/openrosa2xmlmodel.xsl'));
    })
    .then(function(modelXml) {

      var data = {
        modelStr: modelXml,
        instanceStr: null,
        submitted: false,
        external: [],
      };

      var form = new Form(formSelector, data);
      var loadErrors = form.init();

      if(loadErrors && loadErrors.length) {
        setStatus('error: ' + JSON.stringify(loadErrors));
      } else setStatus('loaded');

    })
    .catch(function(err) {
      console.log('Problem fetching form.', err);
      setStatus('error: ' + err);
    });
});
