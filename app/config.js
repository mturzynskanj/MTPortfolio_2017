
var consts = {};

consts.BASEPATH = '';
consts.VENDOR = consts.BASEPATH + '/vendor';
consts.BOWER = consts.VENDOR + '/bower';
consts.APP = consts.BASEPATH + '/app';
consts.MODULES = consts.APP + '/modules';
consts.TEMPLATES = consts.APP + '/templates/'; // must have trailing '/' for templates
consts.API = consts.APP + '/api';


// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
    paths: {
        // Make vendor easier to access.
        'vendor': '../vendor',

        // Almond is used to lighten the output filesize.
        'almond': '../vendor/bower/almond/almond',

        // Opt for Lo-Dash Underscore compatibility build over Underscore.
        'underscore': '../vendor/bower/underscore/underscore',

        // Map remaining vendor dependencies.
        'jquery': '../vendor/bower/jquery/dist/jquery',
        'backbone': '../vendor/bower/backbone/backbone',
        'layoutmanager': '../vendor/bower/layoutmanager/backbone.layoutmanager'
    },

    shim: {
        // This is required to ensure Backbone works as expected within the AMD
        // environment.
        'backbone': {
            // These are the two hard dependencies that will be loaded first.
            deps: ['jquery', 'underscore'],

            // This maps the global `Backbone` object to `require('backbone')`.
            exports: 'Backbone'
        }
    }
});

define("config", function(){});


