exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['src/**/*.js'],
  capabilities: {
    browserName: process.env.TRAVIS ? 'firefox' : 'chrome',
    loggingPrefs: {
      browser: 'ALL',
      driver: 'ALL',
      server: 'ALL',
    },
  },
}
