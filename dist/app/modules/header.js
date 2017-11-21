/**
 * Created by mariaturzynska on 9/18/14.
 */
/**
 * Created by mariaturzynska on 9/18/14.
 */


define('modules/header',['require','exports','module','app'],function (require, exports, module) {
    'use strict';

    var App = require('app');

    // Create a new module.
    var Header = App.module();

    // Views.
    Header.View= Backbone.View.extend({
        el: false,
        template: 'partials/headerWithNavigation',

        afterRender:function(){
            _.each($('.nav').find('a'),function(link) {
                if ($(link).attr('href') === this.model.defaults.activeLink) {
                    $(link).addClass('active');
                    return true;
                }
                return false;
            }, this);
        }
    });

    module.exports = Header;
});
