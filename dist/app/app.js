
define('app',['require','exports','module','underscore','jquery','backbone','layoutmanager'],function(require, exports, module) {
    "use strict";

    // External dependencies.
    var _ = require('underscore');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Layout = require('layoutmanager');


    // Alias the module for easier identification.
    var App = module.exports;

    // The root path to run the application through.
    App = {
        root: '/',
        apiUrl: '/app/api/'
    };


    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    Backbone.Layout.configure({
        manage: true,

        //suppressWarnings: true,

        // Set the prefix to where your templates live on the server, but keep in
        // mind that this prefix needs to match what your production paths will be.
        // Typically those are relative.  So we'll add the leading `/` in `fetch`.
        prefix: App.root + 'app/templates/',


        paths: {
            layout: App.root + 'app/templates/layouts/',
            template: App.root + 'app/templates/'
        },


        // This method will check for prebuilt templates first and fall back to
        // loading in via AJAX.
        fetchTemplate: function(path) {

            // Concatenate the file extension.
            path = path + '.html';

            // Check for a global JST object.  When you build your templates for
            // production, ensure they are all attached here.
            //var JST = window.JST || {};

            // If the path exists in the object, use it instead of fetching remotely.
            if (JST[path]) {
                return JST[path];
            }
             
            console.log('what is JST', JST);

            // debug('[JST] path: ', !JST[path]);
            // debug('[JST] cache template: ', JST);

            // If it does not exist in the JST object, mark this function as
            // asynchronous.
            var done = this.async();

            // Fetch via jQuery's GET.  The third argument specifies the dataType.
            $.get(path, function(contents) {
                // Assuming you're using underscore templates, the compile step here is
                // `_.template`.
                done(JST[path] = _.template(contents));
            }, 'text');
        }
    });

    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(App, {

        // Create a custom object with a nested Views object.
        module: function(additionalProps) {
            return _.extend({ Views: {} }, additionalProps);
        },

        // Helper for using layouts.
        useLayout: function (options) {
            var defaults={
                el:"#page",
                template:"layouts/main"
                };

            _.extend(defaults, options);

            var template=options.template;
            var layout = new Backbone.Layout({
                el: defaults.el,
                template: defaults.template
            });

            // Cache the refererence.
            this.layout = layout;

            // Return the reference, for chainability.
            return layout;
        }

    }, Backbone.Events);
});


