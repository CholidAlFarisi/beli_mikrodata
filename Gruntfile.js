module.exports = (grunt) => {
  grunt.initConfig({
    execute: {
      target: {
        src: ['src/app.js']
      }
    },
    watch: {
      scripts: {
        files: ['src/app.js'],
        tasks: ['execute'],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');
};