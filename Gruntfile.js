'use strict';

// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		connect: {
			server: {
			  options: {
				 base: 'app',
				 livereload: true,
				 open:{
						target: 'http://localhost:8000/index.html',
						appName: 'Chrome',
					}
				}
			}
		},
		postcss: {
			options: {
					map: true,
					processors: [
							require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
							]
				},
			 dist: {
				  src: 'app/public/css/styles.css',
			 }
		},
		wiredep: {
					task: {
			src: ['app/index.html']
				}
		},
		 less: {
				styles: {
				src: 'app/public/less/styles.less',
				dest: 'app/public/css/styles.css'
					}
		},
		jshint: {
			client: {
				src: ['*.js'],
				options: {
						jshintrc: '.jshintrc'
					  }
			}
		},
		watch: {
			less: {
				files: ['app/public/less/*.less'],
				tasks: ['less:styles']
				},
			reload: {
				files: ['app/**/*.js', 'app/**/*.css','app/**/*.html'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['*.js'],
				tasks: ['jshint:client']
			},
			wiredep: {
				  files: ['app/vendor/*'],
				  tasks: ['wiredep:task']
			}
		}
	});


	grunt.registerTask('default',['wiredep','postcss']);
};