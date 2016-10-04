exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['src/**/*.js'],
  capabilities: {
    browserName: 'firefox',
    loggingPrefs: {
      browser: 'ALL',
      driver: 'ALL',
      server: 'ALL',
    },
  },
}
