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
            if(['NoSuchElementError',  'StaleElementReferenceError'].indexOf(err.name) !== -1)
              return resolve(check(500));
            else return reject(err);
          });
      }, timeout);
    });
  };

  return check(0);
}

function loadForm(formPath) {
  browser.get('http://localhost:8888/index.html?form=' + formPath);

  return waitFor(function() {
    return element(by.id('xformunit-loading'))
      .getText()
      .then(function(text) {
        if(text === 'loaded') return true;
        if(text.indexOf('error: ') === 0) throw new Error(text);
        return false;
      });
  });
}

function beforeEach() {
  // enable forwarding of browser logs to stdout
  browser.manage().logs().get('browser').then(function(browserLog) {
    console.log('log: ' + require('util').inspect(browserLog));
  });

  // don't expect angular
  browser.ignoreSynchronization = true;

  // make sure there's nothing left from the previous page
  return browser.get('about:blank');
}

function $(selecter) {
  return element(by.css(selecter));
}

function $input(name) {
  return $('[name="' + name + '"]');
}

function get(fieldName) {
  return $input(fieldName).getAttribute('value');
}

function set(fieldName, newValue) {
  return $input(fieldName)
    .clear()
    .sendKeys(newValue);
}

function unexpected(err) {
  fail('No error expected, but got: ' + err);
}

function update() {
  // to make sure that the form's updated, we need to blur any active field
  return $('body').click();
}

module.exports = {
  beforeEach: beforeEach,
  get: get,
  loadForm: loadForm,
  set: set,
  unexpected: unexpected,
  update: update,
};
