/**
 * Created by mariaturzynska on 9/15/14.
 */

define('modules/resume',['require','exports','module','app','modules/header'],function (require, exports, module) {
    'use strict';

    var App = require('app');
    var Header=require('modules/header');

    // Create a new module.
    var Resume = App.module();

    // Models.

    Resume.Models = {};

    Resume.Models.Index = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Maria Turzynska Resume',
            activeLink: 'myResume'
        }
    });

    // Views.
    Resume.Views.Content = Backbone.Layout.extend({
        template: 'partials/myresume',
        afterRender: function () {

        }
    });

    Resume.Views.Header = Backbone.View.extend({
        template: 'partials/headerWithNavigation'
    });

    Resume.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    // render layout
    Resume.init = function () {
        // get recent work data
        //   var recentProjectItems = new Overview.Collections.RecentWork();
        //    console.log("recent project items",recentProjectItems.fetch());
        //   console.log("recent project items",JSON.stringify(recentProjectItems.fetch()));

        // Use the main layout.
        App.useLayout({ template: 'layouts/main'}).setViews({
            'header'  : new Header.View({ model: new Resume.Models.Index() }),
            '#main'   : new Resume.Views.Content({ model: new Resume.Models.Index() }),
            'footer'  : new Resume.Views.Footer({ model: new Resume.Models.Index() })
        }).render().promise().done(function () {

        });
    };

    module.exports = Resume;
});
