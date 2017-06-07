module.exports = function (grunt) {
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        preserveComments: 'some',
      },
      build: {
        src: 'src/*.js',
        dest: 'build/jsd3.min.js',
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: 'src/*.css',
          dest: 'build/jsd3.min.css',
          ext: '.min.css'
        }]
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['tests/**/*.js'],
      },
    },
  });

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('test', ['mochaTest']);
};