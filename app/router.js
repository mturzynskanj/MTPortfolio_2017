define('router',['require','exports','module','backbone','modules/overview','modules/resume','modules/aboutThisSite','modules/aboutMe','modules/portfolio','modules/header'],function (require, exports, module) {
    'use strict';

    // External dependencies.
    var Backbone = require('backbone');

    var Overview      =    require('modules/overview');
    var Resume        =    require('modules/resume');
    var AboutThisSite =    require('modules/aboutThisSite');
    var AboutMe       =    require('modules/aboutMe');
    var Portfolio     =    require('modules/portfolio');
    var Header        =    require('modules/header');


    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            ''              : 'index',
            'index'         : 'index',
            'myResume'      : 'myResume',
            'aboutThisSite' : 'aboutThisSite',
            'aboutMe'       : 'aboutMe',
            'portfolio'     : 'portfolio'
        },

        index: function () {
             Overview.init();
        },

        myResume:function(){
             Resume.init();
        },

        aboutThisSite:function(){
            AboutThisSite.init();
        },

        aboutMe:function(){
            AboutMe.init();
        },

        portfolio:function(){
            Portfolio.init();
        }

    });
});

