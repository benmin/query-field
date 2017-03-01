//module.exports = function(grunt) {
//
//  grunt.loadNpmTasks('grunt-wiredep');
//  grunt.loadNpmTasks('grunt-contrib-watch');
//  grunt.loadNpmTasks('grunt-contrib-copy');
//
//  grunt.initConfig({
//    wiredep: {
//    	app: {
//    	    src: ['<%= yeoman.app %>/index.html'],
//    	    exclude: ['bower_components/bootstrap/dist/js/bootstrap.js'],
//    	    ignorePath:  /\.\.\//
//    	}
//    }
//  });
//
//  grunt.registerTask('default', ['wiredep']);
//};

module.exports = function (grunt) {

	// load all grunt modules
    require('load-grunt-tasks')(grunt);
	
    grunt.initConfig({
//		meta: {
//			jsFilesForTesting: [
//				'bower_components/jquery/jquery.js',
//				'bower_components/angular-route/angular-route.js',
//		        'bower_components/angular-sanitize/angular-sanitize.js',
//		        'bower_components/angular-mocks/angular-mocks.js',
//		        'bower_components/restangular/dist/restangular.js',
//		        'bower_components/underscore/underscore.js',
//		        'test/**/*Spec.js'
//		    ]
//	    },
//
//	    karma: {
//	      development: {
//	        configFile: 'karma.conf.js',
//	        options: {
//	          files: [
//	            '<%= meta.jsFilesForTesting %>',
//	            'source/**/*.js'
//	          ],
//	        }
//	      }
//		},
	
        
        
        
	
//	    watch: {
//	      wait: {
//	        files: 'src',
//	        tasks: []
//	      }
//	    },
//		jshint: {
//			options: {
//			    reporter: require('jshint-stylish')
//			},
//			beforebuild: [
//                'src/**/*.js'
//            ]
//		},
//		copy: {
//			build: {
//				cwd: 'src',
//				src: ['**'],
//				dest: 'dist',
//				expand: true
//			}
//		},
//		clean: {
//			src: {
//				src: ['dist/public']
//			},
//			dependencies: {
//				src: ['dist/node_modules','dist/my_modules','dist/bower_components']
//			},
//			all: {
//				src: ['dist']
//			},
//			js: {
//				src: ['dist/public/js']
//			},
//			css: {
//				src: ['dist/public/css']
//			}
//		},
//		uglify: {
//			build: {
//				options: {
//					mangle: false
//				},
//				files: {
//					'dist/public/app.min.js': ['dist/public/js/**/*.js']
//				}
//			}
//		},
//		autoprefixer: {
//			build: {
//				cwd: 'dist',
//				src: ['public/css/**/*.css'],
//				dest: 'public/css',
//				expand: true
//			}
//		},
//		postcss: {
//		    options: {
//		    	map: true,
//		    	processors: [
//	                require('autoprefixer')({
//	                	browsers: ['last 3 versions']
//	                })
//		        ]
//		    },
//		    build: {
////		    	files: [{
////	                expand: true,
////	                cwd: 'dist/public/css/',
////	                src: ['dist/public/css/**/*.css'],
////	                dest: 'dist/public/css/'
////	            }]
//		        src: 'dist/public/css/**/*.css'
//		    }
//		},
//		cssmin: {
//			build: {
//				files: {
//					'dist/public/style.min.css': ['dist/public/css/**/*.css']
//				}
//			}
//		},
//		processhtml: {
//			build: {
//				files: {
//					'dist/public/index.html': ['dist/public/index.html']
//				}
//			}
//		},
//		
//		copy: {
//			src: {
//				files: [{
//					cwd: 'src',
//					src: ['**'],
//					dest: 'dist',
//					expand: true
//				}]
//			},
//			dependencies: {
//				files: [{
//					src: ['node_modules/**','my_components/**','bower_components/**'],
//					dest: 'dist',
//					expand: true
//				}]
//			}
//		},
//	    watch: {
//			options: {
//				livereload: true
//			},
//			dev: {
//				files: ['src/**/*'],
//				tasks: ['express:dev'],
//				options: {
//					spawn: false
//				}
//			},
//			prod: {
//				files: ['src/**/*'],
//				tasks: ['build-src','express:prod'],
//				options: {
//					spawn: false
//				}
//			}
//		},
//		babel: {
//			options: {
//	            plugins: ['transform-react-jsx'],
//	            presets: ['es2015','react']
//	        },
//	        jsx: {
//	            files: [{
//	            	expand: true,
//	            	cwd: 'dist/public/js',
//	            	src: '*.jsx',
//	            	dest: 'dist/public/js',
//	            	ext: '.js'
//	            }]
//	        }
//		}
        
        connect: {
            dev: {
                options: {
                    port: 8080,
                    hostname: '*',
                    keepalive: true,
                    base: ['bower_components','src']
                }
            },
            prod: {
                options: {
                    port: 8080,
                    hostname: '*',
                    keepalive: true,
                    base: ['bower_components','dist']
                }
            }
        },
        
        browserify: {
            options: {
                browserifyOptions: {
                    extensions: ['.jsx']
                },
                transform: [
                    ['babelify', {presets: ['es2015','react']}]
                ]
            },
            build: {
                src: ['src/jsx/*.jsx'],
                dest: 'dist/js/query-field.js'
            }
        },
        
        cssmin: {
            build: {
                files: {
                    'dist/style.min.css': ['dist/css/style.css']
                }
            }
		},
        
		processhtml: {
			build: {
				files: {
					'dist/index.html': ['dist/index.html'],
				}
			}
		},
        
		clean: {
			all: {
				src: ['dist']
			},
			js: {
				src: ['dist/js','dist/jsx']
			},
			css: {
				src: ['dist/css']
			}
		},
        
        copy: {
            all: {
                files: [{
                    cwd: 'src',
                    src: ['**','!jsx/**'],
                    dest: 'dist',
                    expand: true
                }]
            }
		},
        
		uglify: {
			build: {
				options: {
					mangle: true
				},
				files: {
					'dist/query-field.min.js': ['dist/js/query-field.js']
				}
			}
		},
        
        postcss: {
		    options: {
		    	map: true,
		    	processors: [
	                require('autoprefixer')({
	                	browsers: ['last 3 versions']
	                })
		        ]
		    },
		    build: {
		        src: 'dist/css/**/*.css'
		    }
		}
        
	});

//	grunt.registerTask('test', ['karma:development']);
//	
//	grunt.registerTask('build-src', ['clean:src','copy:src','postcss:build','cssmin','clean:css','babel:jsx','uglify:build','clean:js','processhtml']);
//	grunt.registerTask('build-dependencies', ['clean:dependencies','copy:dependencies']);
//	grunt.registerTask('build-all', ['build-dependencies','build-src']);
//	grunt.registerTask('run-dev', ['express:dev','watch:dev']);
//	grunt.registerTask('run-prod', ['express:prod','watch:prod']);
//	grunt.registerTask('rebuild-run', ['build-src','run-prod']);
//    grunt.registerTask('run', ['express:dev','keepalive']);
    grunt.registerTask('dev-run', ['connect:dev']);
    
    grunt.registerTask('build-jsx', ['browserify:build']);
    grunt.registerTask('build-css', ['cssmin:build']);
    grunt.registerTask('build-html', ['processhtml:build']);
    
    grunt.registerTask('prod-build', ['clean:all','copy:all','build-jsx','uglify:build','clean:js','postcss:build','build-css','clean:css','build-html']);
    grunt.registerTask('prod-run', ['connect:prod']);
    grunt.registerTask('prod-build-run', ['prod-build','prod-run']);
};