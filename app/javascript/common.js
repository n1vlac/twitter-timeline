define(function () {
  "use strict";

  var OAUTH_KEY;

  var OFFLINE_MODE = false;

  var TIMELINE_API_URL = "/1.1/statuses/home_timeline.json";
  var UPDATE_API_URL = "/1.1/statuses/update.json";

  // Use this to make requests to Twitter API
  // get|post|put|del|patch|me methods
  var authSession;

  // BEGIN sample data

  var sampleMe = {};

  var sampleTweets1 = [];
  var sampleTweets2 = [];
  // END sample data

  return {
    OAUTH_KEY: OAUTH_KEY,
    OFFLINE_MODE: OFFLINE_MODE,
    TIMELINE_API_URL: TIMELINE_API_URL,
    UPDATE_API_URL: UPDATE_API_URL,

    authSession: authSession,

    sampleMe: sampleMe,
    sampleTweets1: sampleTweets1,
    sampleTweets2: sampleTweets2
  };
});