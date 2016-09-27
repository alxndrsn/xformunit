module.exports = function(grunt) {

  grunt.initConfig({

    browserify: {
      www: {
        src: ['src/www/index.js'],
        dest: 'build/www/index.js',
      },
    },

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

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-protractor-runner');


  grunt.registerTask('test', [
    'browserify',
    'connect',
    'protractor',
  ]);

};
