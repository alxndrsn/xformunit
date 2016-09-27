module.exports = function(grunt) {

  grunt.initConfig({

    connect: {
      options: {
        port: 8888,
        hostname: 'localhost',
      },
      test: {
        options: {
          base: [ 'build/www' ],
        },
      },
    },

    protractor: {
      xforms: {
        options: {
          configFile: 'test/protractor-conf.js',
        }
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-protractor-runner');

};
