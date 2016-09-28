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

    exec: {
      www_files: {
        cmd: '(! [ -d build ] || rm -rf build) && ' +
            'mkdir -p build && ' +
            'cp -r src/www build/ && ' +
            'cp -r test/res build/www/',
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
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-protractor-runner');


  grunt.registerTask('test', [
    'exec:www_files',
    'browserify',
    'connect',
    'protractor',
  ]);

};
