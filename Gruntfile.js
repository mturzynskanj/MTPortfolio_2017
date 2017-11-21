module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        // Wipe out previous builds and test reporting.
        clean: ["dist/", "test/reports","app/styles/css"],

        // Run your source code through JSHint's defaults.
        jshint: ["app/**/*.js"],

        // This task uses James Burke's excellent r.js AMD builder to take all
        // modules and concatenate them into a single file.
        requirejs: {
            release: {
                options: {
                    mainConfigFile: "app/config.js",
                    generateSourceMaps: true,
                    include: ["main"],
                    insertRequire: ["main"],
                    out: "dist/source.min.js",
                    optimize: "uglify2",

                    // Since we bootstrap with nested `require` calls this option allows
                    // R.js to find them.
                    findNestedDependencies: true,

                    // Include a minimal AMD implementation shim.
                    name: "almond",

                    // Setting the base url to the distribution directory allows the
                    // Uglify minification process to correctly map paths for Source
                    // Maps.
                    baseUrl: "dist/app",

                    // Wrap everything in an IIFE.
                    wrap: true,

                    // Do not preserve any license comments when working with source
                    // maps.  These options are incompatible.
                    preserveLicenseComments: false
                }
            }
        },


        // Minfiy the distribution CSS.
        cssmin: {
            release: {
                files: {
                    "dist/styles.min.css": ["dist/app/styles/css/*.css"],
                    "app/styles/css/styles.min.css":["app/styles/css/*.css"]
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files:{
                    'app/styles/css/index.css' :'app/styles/index.scss'
                    //target                  : //source
                }
            }
        },

        connect: {
            app:{
                options:{
                    port:9001,
                    keepalive:true
                }
            }
        },

        processhtml: {
            release: {
                files: {
                    "dist/index.html": ["index.html"]
                }
            }
        },

        // Move vendor and app logic during a build.
        copy: {
            release: {
                files: [
                    { src: ["app/**"], dest: "dist/" },
                    { src: "vendor/**", dest: "dist/" }
                ]
            }
        }

    });

    // Grunt contribution tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-sass");

    // Third-party tasks.
    grunt.loadNpmTasks("grunt-processhtml");

    // Grunt BBB tasks.
    grunt.loadNpmTasks("grunt-bbb-requirejs");

    grunt.loadNpmTasks('grunt-contrib-connect');


    // Create an aliased test task.
  //  grunt.registerTask("test", ["karma:run"]);

    // When running the default Grunt command, just lint the code.
    grunt.registerTask("default", [
        "clean",
        "jshint",
        "processhtml",
        "sass",
        "copy",
        "requirejs",
        "cssmin"
    ]);

    grunt.registerTask('server',['server:options']);
};
