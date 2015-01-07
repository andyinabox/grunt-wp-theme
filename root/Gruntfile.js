module.exports = function( grunt ) {
	'use strict';

	// Load time grunt
	// https://github.com/sindresorhus/time-grunt
	require('time-grunt')(grunt);

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),

		//
		// javascript
		//
		jshint: {
			browser: {
				all: [
					'assets/js/src/**/*.js',
					'assets/js/test/**/*.js'
				],
				options: {
					jshintrc: '.jshintrc'
				}
			},
			grunt: {
				all: [
					'Gruntfile.js'
				],
				options: {
					jshintrc: '.gruntjshintrc'
				}
			}
		},

		bower: {
		  all: {
		    options: {
					baseUrl: './assets/js/'
				},
				rjsConfig: 'assets/js/src/requirejs-config.js'
		  }
		},

		requirejs: {
			all: {
				options: {
					baseUrl: 'assets/js/'
					, mainConfigFile: 'assets/js/src/requirejs-config.js'
					, name: '{%= js_safe_name %}'
					, out: 'assets/js/{%= js_safe_name %}.min.js'
					, include: ['src/{%= js_safe_name %}']
					, pragmas : {
						configExclude : true
					}
				}
			}
		},

		test:   {
			files: ['assets/js/test/**/*.js']
		},

		//
		// styles
		//

		{% if ('sass' === css_type) { %}
		sass:   {
			all: {
				files: {
					'assets/css/{%= js_safe_name %}.css': 'assets/css/sass/{%= js_safe_name %}.scss'
				}
			}
		},
		{% } else if ('less' === css_type) { %}
		less:   {
			all: {
				files: {
					'assets/css/{%= js_safe_name %}.css': 'assets/css/less/{%= js_safe_name %}.less'
				}
			}
		},
		{% } %}
		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			minify: {
				expand: true,
				{% if ('sass' === css_type || 'less' === css_type) { %}
				cwd: 'assets/css/',
				src: ['{%= js_safe_name %}.css'],
				{% } else { %}
				cwd: 'assets/css/src/',
				src: ['{%= js_safe_name %}.css'],
				{% } %}
				dest: 'assets/css/',
				ext: '.min.css'
			}
		},

		//
		// watch
		//

		watch:  {

			// enable livereload for development
			options: {
				livereload: true
			},

			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:grunt'],
				options: {
					reload: true
				}
			},

			js: {
				files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
				tasks: ['js'],
				options: {
					debounceDelay: 500
				}
			},

			{% if ('sass' === css_type) { %}
			css: {
				files: ['assets/css/sass/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			{% } else if ('less' === css_type) { %}
			css: {
				files: ['assets/css/less/*.less'],
				tasks: ['less', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			{% } else { %}
			css: {
				files: ['assets/css/src/*.css'],
				tasks: ['cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			{% } %}

			// reload when php files are edited
			php: {
				files: ['**/*.php'],
				options: {
					debounceDelay: 500
				}
			},

			// maintain bower deps
			bower: {
				files: ['bower.json'],
				tasks: ['bower'],
				options: {
					debounceDelay: 500,
					livereload: false
				}
			}
		},

		//
		// misc
		//

		'release-it' : {
			options: {
				pkgFiles: ['package.json', 'bower.json'],
				commitMessage: 'Release %s',
				tagName: '%s',
				tagAnnotation: 'Release %s',
				publish: false,
				distRepo: false
			}
		}

	} );

	// we're just watching by default
	grunt.registerTask( 'default', ['watch']);

	// js build
	grunt.registerTask( 'js', ['requirejs']);

	// css build
	{% if ('sass' === css_type) { %}
	grunt.registerTask( 'css', ['sass', 'cssmin'] );
	{% } else if ('less' === css_type) { %}
	grunt.registerTask( 'css', ['less', 'cssmin'] );
	{% } else { %}
	grunt.registerTask( 'css', ['cssmin'] );
	{% } %}

	// full build
	grunt.registerTask( 'build', ['css', 'js'] );

	// release tasks to aid in versioning/tagging
	// also ensures that a built version is always tagged
	grunt.registerTask( 'release', ['build', 'release-it'] );
	grunt.registerTask( 'release:minor', ['build', 'release-it:minor'] );
	grunt.registerTask( 'release:major', ['build', 'release-it:major'] );


	grunt.util.linefeed = '\n';
};
