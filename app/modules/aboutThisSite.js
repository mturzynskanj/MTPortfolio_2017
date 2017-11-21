
/**
 * Created by mariaturzynska on 9/15/14.
 */
define('modules/aboutThisSite',['require','exports','module','app','modules/header'],function (require, exports, module) {
    'use strict';

    var App = require('app');
    var Header=require('modules/header');

    // Create a new module.
    var AboutThisSite = App.module();

    // Models.

    AboutThisSite.Models = {};

    AboutThisSite.Models.Index = Backbone.Model.extend({
        defaults: {
            pageTitle: 'About this site',
            activeLink: 'aboutThisSite'
        }
    });

    // Views.
    AboutThisSite.Views.Content = Backbone.Layout.extend({
        template: 'partials/aboutThisSite'

    });

    AboutThisSite.Views.Header = Backbone.View.extend({
        template: 'partials/headerWithNavigation'
    });

    AboutThisSite.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    // render layout
    AboutThisSite.init = function () {

        // Use the main layout.
        App.useLayout({ template: 'layouts/indexmain'}).setViews({
            'header' : new Header.View({ model: new AboutThisSite.Models.Index() }),
            '#main'  : new AboutThisSite.Views.Content({ model: new AboutThisSite.Models.Index() }),
            'footer' : new AboutThisSite.Views.Footer({ model: new AboutThisSite.Models.Index() })
        }).render().promise().done(function () {
        });
    };

    module.exports = AboutThisSite;
});

