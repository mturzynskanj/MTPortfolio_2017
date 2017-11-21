/**
 * Created by mariaturzynska on 9/15/14.
 */
define('modules/overview',['require','exports','module','app'],function (require, exports, module) {
    'use strict';

    var App = require('app');

    // Create a new module.
    var Overview = App.module();

    // Models.

    Overview.Models = {};

    Overview.Models.Index = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Overview',
            activeLink: 'overview'
        }
    });

    Overview.Models.RecentWork = Backbone.Model.extend({
        defaults: {}
    });

    // Views.
    Overview.Views.Content = Backbone.Layout.extend({
        template: 'overview/index',

    });

    Overview.Views.Header = Backbone.View.extend({
        template: 'partials/header'

    });

    Overview.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    // render layout
    Overview.init = function () {
            // Use the main layout.
            App.useLayout({ template: 'layouts/indexmain'}).setViews({
                'header' :  new Overview.Views.Header({ model: new Overview.Models.Index() }),
                'section': new Overview.Views.Content({ model: new Overview.Models.Index() }),
                'footer' : new Overview.Views.Footer({ model: new Overview.Models.Index() })
            }).render().promise().done(function () {

            });
    };
    module.exports = Overview;
});
