module.exports = function(grunt) {

  //2. krok - konfiguracja tasków
  grunt.initConfig({

    jshint: {
        all: ['js/*.js']
    },
    sass: {
    	options: {
      		sourceMap: true
        },
        dist: {
        	files: {
        		'css/css.css': 'scss/scss.scss'
      }
    }
  },

  imagemin: {
    dynamic: {
        files: [{
            expand: true,
            cwd: 'images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'images/build/'
        }]
    }
  },

  uglify: {
    my_target: {
    files: {
      'dest/output.min.js': 'js/*.js'
    }
    }
  },

   browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "css/*.css",
	    "dest/*.js",
	    "images/build/*.{png,jpg,gif}",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
             baseDir: "./"
          }
        }
      }
    },

  watch: {

	sass:{
        	files: ['scss/*.scss'],
        	tasks: ['sass'],
        	options: {
            		spawn: false,
            		livereload: true
        	},
    
	},
	imagemin: {
        	files: ['images/*.{png,jpg,gif,jpeg}'],
        	tasks: ['imagemin'],
        	options: {
            		spawn: false,
			livereload: true
        	},
    	},

	jshint: {
        	files: ['js/*.js'],
        	tasks: ['jshint'],
        	options: {
            		spawn: false
			
        	},
    	},

	uglify: {
        	files: ['js/*.js'],
        	tasks: ['uglify'],
        	options: {
            		spawn: false,
			livereload: true
        	},
    	}
	


  }//koniec watch





  });

  // 1. krok -> ³adowanie paczki z npm-a
  grunt.loadNpmTasks('grunt-sass');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');



  // 3. W³¹czanie tasków
  grunt.registerTask('default', ["jshint","sass","uglify","browserSync","watch"]);
};