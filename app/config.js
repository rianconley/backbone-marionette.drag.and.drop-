requirejs.config({
  'paths': {
    // define vendor paths
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore/underscore',
    'backbone.marionette':'vendor/backbone.marionette/lib/core/backbone.marionette',
    'backbone': 'vendor/backbone/backbone',
    'backbone.babysitter':'vendor/backbone.babysitter/lib/backbone.babysitter',
     'backbone.wreqr':'vendor/backbone.wreqr/lib/backbone.wreqr',
     'bootstrap':"vendor/bootstrap/dist/js/bootstrap",
     'backbone.localStorage':'vendor/backbone.localStorage/backbone.localStorage'
  },
    'shim': {
        'jquery': {
          'exports': '$'
        },
        'underscore': {
          'exports': '_'
        },
        'backbone': {
          'deps': ['jquery', 'underscore'],
          'exports': 'Backbone'
        },
        'backbone.marionette':{
            'deps':['underscore', 'backbone', 'jquery','backbone.babysitter','backbone.wreqr'],
            'exports':'Backbone.Marionette'
        }
    
    }


});

require([ 'public/js/app' ], function(App) {
App.start();
});