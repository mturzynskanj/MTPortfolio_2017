/**
 * Created by mariaturzynska on 9/15/14.
 */
define('modules/aboutMe',['require','exports','module','app','modules/header'],function (require, exports, module) {
    'use strict';

    var App = require('app');
    var Header=require('modules/header');

    // Create a new module.
    var AboutMe = App.module();

    // Models.

    AboutMe.Models = {};

    AboutMe.Models.Index = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Maria Turzynska about me',
            activeLink: 'aboutMe'
        }
    });

    // Views.

    AboutMe.Views.Content = Backbone.Layout.extend({
        template: 'partials/aboutMe',
        afterRender: function () {

        }
    });


    AboutMe.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });

    // render layout
    AboutMe.init = function () {
        // Use the main layout.
        App.useLayout({ template: 'layouts/indexmain'}).setViews({
            'header' : new Header.View({ model: new AboutMe.Models.Index() }),
            '#main'  : new AboutMe.Views.Content({ model: new AboutMe.Models.Index() }),
            'footer' : new AboutMe.Views.Footer({ model: new AboutMe.Models.Index() })
        }).render().promise().done(function () {

        });
    };

    module.exports = AboutMe;
});

