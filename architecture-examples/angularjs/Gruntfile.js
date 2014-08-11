module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        dist: {
        src: ['js/**/*.js'],
        dest: 'min/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
            report: 'min',
            mangle: false
        },
      dist: {
        files:[ {
          'min/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        },
        {
          'min/base.min.js': ['bower_components/todomvc-common/base.js']
        },
         {
          'min/angular.min.js': ['bower_components/angular/angular.js']
        },
         {
          'min/angular-route.min.js': ['bower_components/angular-route/angular-route.js']
        }]
      }
    },

	cssmin: {
	  minify: {
	    expand: true,
	    cwd: 'bower_components/todomvc-common/',
	    src: ['*.css', '!*.min.css'],
	    dest: 'min/',
	    ext: '.min.css'
	  }
	},

    jshint: {
      files: ['Gruntfile.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);

};