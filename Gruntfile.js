module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    mochaTest: {
      unit: {
        src: ['test/**/*.js'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', [
    'mochaTest:unit',
  ]);
};
