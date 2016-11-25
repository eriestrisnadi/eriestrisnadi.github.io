'use strict'
module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap : true
                },
                files : {
                    'dist/css/app.min.css': 'src/sass/**/*.sass'
                }
            }
        },
        copy: {
          main: {
            files: [
              {expand: true, cwd: 'node_modules/tether/dist/js/', src: ['**/*.min.js'], dest: 'dist/js/'},
              {expand: true, cwd: 'node_modules/tether/dist/css/', src: ['**/*.min.css'], dest: 'dist/css/'},
              {expand: true, cwd: 'node_modules/bootstrap/dist/js/', src: ['**/*.min.js'], dest: 'dist/js/'},
              {expand: true, cwd: 'node_modules/bootstrap/dist/css/', src: ['**/*.min.css'], dest: 'dist/css/'},
              {expand: true, cwd: 'node_modules/daemonite-material/js/', src: ['**/*.min.js'], dest: 'dist/js/'},
              {expand: true, cwd: 'node_modules/daemonite-material/css/', src: ['**/*.min.css'], dest: 'dist/css/'}
            ],
          },
        },
        jshint: {
          options: {
            jshintrc: '.jshintrc'
          },
          lib: {
            src: ['src/**/*.js']
          },
        },
        uglify: {
            dist: {
                options: {
                    compress: true,
                    mangle: true,
                    preserveComments: false
                },
                files: {
                    'dist/js/app.min.js' : 'src/**/*.js'
                }
            }
        },
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'dist/css',
              src: ['*.css', '!*.min.css'],
              dest: 'dist/css',
              ext: '.min.css'
            }]
          }
        },
        pug: {
          compile: {
            options: {
              data: {
                debug: false
              }
            },
            files: {
              'index.html': ['src/views/index.pug']
            }
          }
        },
        connect: {
            server : {
                options: {
                    open: true,
                    keepalive: true,
                    port: 3000,
                    hostname: 'localhost'
                }
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-pug')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-jshint')

    grunt.registerTask('dist', ['jshint', 'pug', 'sass:dist', 'uglify:dist', 'copy:main', 'cssmin', 'connect:server'])
}
