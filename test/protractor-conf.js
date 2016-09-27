exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['src/**/*.js'],
  capabilities: {
    browserName: 'chrome',
    loggingPrefs: {
      browser: 'ALL',
      driver: 'ALL',
      server: 'ALL',
    },
  },
}
