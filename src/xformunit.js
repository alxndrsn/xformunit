var TIMEOUT = 5000;

function waitFor(fn) {
  var startTime = Date.now();
  return new Promise(function(resolve, reject) {
    function check() {
      if(fn()) return resolve();
      else if(startTime + TIMEOUT >= Date.now()) {
        setTimeout(500, check);
      } else {
        return reject(new Error('waitFor timed out after ' + TIMEOUT + 'ms'));
      }
    }

    check();
  });
}

function loadForm(formPath) {
  // enable forwarding of browser logs to stdout
  browser.manage().logs().get('browser').then(function(browserLog) {
    console.log('log: ' + require('util').inspect(browserLog));
  });

  browser.ignoreSynchronization = true;
  browser.get('http://localhost:8888/index.html?form=' + formPath);
  console.log('Xformunit loading:', element(by.id('xformunit-loading')).getText());

  var wf = waitFor(function() {
    return element(by.id('xformunit-loading')).getText() === 'loaded';
  });
  console.warn('loadForm()', 'wf', wf);
  return wf;
}

module.exports = {
  loadForm: loadForm,
};
