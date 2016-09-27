/*function loadForm(formPath) {
  browser.ignoreSynchronization = true;
  browser.get('http://localhost:8888/index.html?form=' + formPath);
  expect(element(by.id('xformunit-loading')).getText()).toEqual('loaded');
}

module.exports = {
  loadForm: loadForm,
};*/

var TIMEOUT = 5000;

function waitFor(fn) {
  var startTime = Date.now();

  var check = function(timeout) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        fn()
          .then(function(res) {
            if(res) return resolve(true);
            else if(startTime + TIMEOUT >= Date.now()) {
              return resolve(check(500));
            } else throw new Error('waitFor timed out after ' + TIMEOUT + 'ms');
          })
          .catch(function(err) {
            console.log('Caught error', JSON.stringify(err));
            if(err.name !== 'NoSuchElementError') return reject(err);
            return resolve(check(500));
          });
      }, timeout);
    });
  };

  return check(0);

/*
  return new Promise(function(resolve, reject) {
    var check = function() {
      if(fn()) return resolve();
      else if(startTime + TIMEOUT >= Date.now()) {
        setTimeout(check, 500);
      } else {
        return reject(new Error('waitFor timed out after ' + TIMEOUT + 'ms'));
      }
    }

    check();
  });*/
}

function loadForm(formPath) {
  // enable forwarding of browser logs to stdout
  browser.manage().logs().get('browser').then(function(browserLog) {
    console.log('log: ' + require('util').inspect(browserLog));
  });

  browser.ignoreSynchronization = true;
  browser.get('http://localhost:8888/index.html?form=' + formPath);
//  console.log('Xformunit loading:', element(by.id('xformunit-loading')).getText());

  var wf = waitFor(function() {
    return element(by.id('xformunit-loading'))
      .getText()
      .then(function(text) {
        console.log('Fetched element text as ' + text);
        return text === 'loaded';
      });
  });
  console.warn('loadForm()', 'wf', wf);
  return wf;
}

module.exports = {
  loadForm: loadForm,
};
