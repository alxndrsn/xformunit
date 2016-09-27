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
}

function loadForm(formPath) {
  // enable forwarding of browser logs to stdout
  browser.manage().logs().get('browser').then(function(browserLog) {
    console.log('log: ' + require('util').inspect(browserLog));
  });

  browser.ignoreSynchronization = true;
  browser.get('http://localhost:8888/index.html?form=' + formPath);

  return waitFor(function() {
    return element(by.id('xformunit-loading'))
      .getText()
      .then(function(text) {
        return text === 'loaded';
      });
  });
}

module.exports = {
  loadForm: loadForm,
};
