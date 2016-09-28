var modelXsl = './xsl/model.xsl';
var htmlXsl = './xsl/html.xsl';

window.$ = window.jQuery = require('jquery');
var xslt = require('./xslt');
require('enketo-core');
var request = require('request');
var url = require('url');

var Form = require('enketo-core');
var formSelector = '#form-container';

var location = url.parse(window.location.href);
var formPath = location.query && location.query.split('&').find(function(param) { return param.indexOf('form=') === 0; });
formPath = formPath && formPath.split('=', 2)[1];

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

  formSelector.append(xslt(formXml, htmlXsl));

  var data = {
    modelStr: xslt(formXml, modelXsl),
    instanceStr: null,
    submitted: false,
    external: [],
  };

  var form = new Form(formSelector, data);
  var loadErrors = form.init();

  if(loadErrors && loadErrors.length) {
    setStatus('error: ' + JSON.stringify(loadErrors));
  } else setStatus('loaded');

});
