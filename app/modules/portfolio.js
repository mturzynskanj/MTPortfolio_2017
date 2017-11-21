/**
 * Created by mariaturzynska on 9/17/14.
 */
define('modules/portfolio',['require','exports','module','app','modules/header'],function (require, exports, module) {
    'use strict';

    var App   = require('app');
    var Header= require('modules/header');


    // Create a new module.
    var Portfolio = App.module();


    // Models.
    Portfolio.Models = {};
    Portfolio.variables={
        $currentExpanded:null,
        $currentDetails:null

    };

    Portfolio.Models.Index = Backbone.Model.extend({
        defaults: {
            pageTitle : 'Portfolio',
            activeLink: 'portfolio'
        },


        validate:function(attr){
              if(attr.pageTitle===""){
                 return 'Title can not be empty';
              }
        }
    });



    Portfolio.Models.Portfolio = Backbone.Model.extend({
        defaults: {}
    });



    // Collections
    Portfolio.Collections = {};

    Portfolio.Collections.Index = Backbone.Collection.extend({
        model: Portfolio.Models.Index
    });


    Portfolio.Collections.Portfolio = Backbone.Collection.extend({
        model: Portfolio.Models.Portfolio,

        url: function () {
              return  '/app/data/porfolio.json';
        },

        initialize:function(){

        }
    });


    // Views.
    Portfolio.Views.Content = Backbone.Layout.extend({
        template: 'overview/index'

    });


    Portfolio.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    Portfolio.Views.Items = Backbone.View.extend({
        el: false,
        template: 'portfolio/items',
        initialize: function () {
        },

        beforeRender: function () {
            this.collection.each(function (item) {
                // render row
                this.insertView('ul#project_list', new Portfolio.Views.Item({
                    model: item
                }));
            }, this);
        },

        afterRender:function() {
            setTimeout(function(){
                $('#project_list').find('.item:first-child').find('.title').trigger('click');
            },500);

        }
    });


    Portfolio.Views.Item = Backbone.View.extend({
        el: false,
        events:{
            "click .title"      : 'expandAccordion',
            "click .controls"   : 'showDetails',
            "click .close_link" : 'hideDetails'
        },

        expandAccordion:function(e){
            if( Portfolio.variables.$currentExpanded !== null){
                if(Portfolio.variables.$currentDetails){
                    Portfolio.variables.$currentDetails.removeClass('show');
                }
                Portfolio.variables.$currentExpanded.removeClass('in');
                $(e.target).parent().addClass('in');
                Portfolio.variables.$currentExpanded=$(e.target).parent();
            }else{
                $(e.target).parent().addClass('in');
                Portfolio.variables.$currentExpanded= $(e.target).parent();
            }
        },

        showDetails:function(e){
            Portfolio.variables.$currentDetails=Portfolio.variables.$currentExpanded.find('.details');
            Portfolio.variables.$currentDetails.addClass('show');
        },

        hideDetails:function(){
            Portfolio.variables.$currentExpanded.find('.details').removeClass('show');
        },

        template: '/portfolio/item',
        serialize: function () {
            return _.clone(this.model.attributes);
        }
    });


    // render layout
    Portfolio.init = function () {
        // get recent work data
        var recentProjectItems = new Portfolio.Collections.Portfolio();
        recentProjectItems.fetch().then(function () {

            // Use the main layout.
            App.useLayout({ template: 'layouts/indexmain'}).setViews({
                'header' : new Header.View({ model: new Portfolio.Models.Index() }),
                '#main'  : new Portfolio.Views.Items({ collection: recentProjectItems }),
                'footer' : new Portfolio.Views.Footer({ model: new Portfolio.Models.Index() })
            }).render().promise().done(function () {

            });
        });
    };

    module.exports = Portfolio;
});
