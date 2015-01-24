require.config({
  baseUrl: "./app/javascript",
  paths: {
    jQuery:             "libs/jquery/jquery.min",
    backbone:           "libs/backbone/backbone-min",
    underscore:         "libs/underscore/underscore-min",
    react:              "libs/react/react-with-addons.min",
    oauth:              "libs/oauth-js/oauth.min",
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jQuery", "underscore"],
      exports: "Backbone"
    },
    react: {
      exports: "React"
    },
    oauth: {
      exports: "OAuth"
    }
  }
});

define(function(require) {
  "use strict";

  var $ = require("jQuery");
  var Backbone = require("backbone");
  var React = require("react");
  var OAuth = require("oauth");

  React.initializeTouchEvents(true);
});
