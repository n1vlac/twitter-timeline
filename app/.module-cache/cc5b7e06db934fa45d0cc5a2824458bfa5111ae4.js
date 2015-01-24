require.config({
  baseUrl: "./javascript",
  paths: {
    jQuery:             "libs/jquery/jquery.min",
    underscore:         "libs/underscore/underscore-min",
    react:              "libs/react/react-with-addons",
    oauth:              "libs/oauth-js/oauth.min",
  },
  shim: {
    underscore: {
      exports: "_"
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
  var React = require("react");
  var OAuth = require("oauth");

  React.initializeTouchEvents(true);
});
