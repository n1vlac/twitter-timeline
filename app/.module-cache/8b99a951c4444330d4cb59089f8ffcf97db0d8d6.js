require([
  "react",
  "common",
  "components/navbar",
  "components/timeline"
], function (
  React,
  Common,
  Navbar,
  Timeline
) {
  "use strict";

  /* global OAuth */
  /* jshint devel:true */
  /* jshint camelcase:false */

  var isFetchingTimeline = false;

  var AppNavbar = React.render(
    React.createElement(Navbar.TopNavbar, {navbarBrand: "Twitter Timeline"}),
    document.getElementById("nav-header")
  );
  var MyTimeline;

  // Parse logged-in user profile settings
  function parseUserData() {
    var userDataRaw = Common.me.raw;

    var bgColor = userDataRaw.profile_background_color ?
      "#" + userDataRaw.profile_background_color : "white";
    var bgImgURL = userDataRaw.profile_background_image_url;
    var useBgImg = userDataRaw.profile_use_background_image;
    var isBgTiled = userDataRaw.profile_background_tile;
    var avatarImgUrl = Common.me.avatar;
    var profileLinkColor = "#" + userDataRaw.profile_link_color;

    var screenName = userDataRaw.screen_name;
    var userName = userDataRaw.name;

    // Pass user info to navbar for display
    AppNavbar.setProps({
      screenName: screenName,
      avatarImgUrl: avatarImgUrl
    });

    var $head = $("head");
    var $body = $("body");

    // Set body background properties
    if (useBgImg && bgImgURL) {
      var bgImg = "url(" + bgImgURL + ")";
      var bgRepeat = isBgTiled ? "repeat" : "no-repeat";
      $body.css("background-image", bgImg)
        .css("background-repeat", bgRepeat)
        .css("background-color", bgColor);
    }

    // Set user-specific link color
    var $newStyles = $("<style type=text/css></style>");
    $newStyles.append("a { color: " + profileLinkColor + ";}"
      + "a:hover { color: " + profileLinkColor + ";}"
      + ".timeline-composer-input::-webkit-input-placeholder {"
        + "color: " + profileLinkColor + ";}"
      + ".timeline-composer-input::-moz-placeholder {"
        + "color: " + profileLinkColor + ";}"
      + ".timeline-composer-input:-moz-placeholder {"
        + "color: " + profileLinkColor + ";}"
      + ".timeline-composer-input:-ms-input-placeholder {"
        + "color: " + profileLinkColor + ";}"
      + ".tweet-content-user-header .profile-link:hover .user-fullname,"
        + ".tweet-content-user-header .tweet-link:hover {"
        + "color: " + profileLinkColor + " !important;}"
    );
    $head.append($newStyles);
  }

  // Callback for once user info and timeline are fetched
  function handleDataFetchComplete() {
    if (Common.me && Common.tweets) {
      console.log(Common.me);
      console.log(Common.tweets);

      MyTimeline = React.render(
        React.createElement(Timeline, {tweets: Common.tweets, userProfile: Common.me}),
        document.getElementById("timeline-container")
      );

      // Once timeline is rendered, setup window scroll event handler
      setupInfiniteScrollHandler();
    }
  }

  // Handler for infinite scrolling
  function setupInfiniteScrollHandler() {
    // # pixels from bottom scroller should be to trigger fetching the next set
    // of tweets.
    var PIXELS_FROM_BOTTOM = 250;

    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() >
        $(document).height() - PIXELS_FROM_BOTTOM) {

        // Check and set lock
        if (!isFetchingTimeline) {
          isFetchingTimeline = true;

          if (!Common.OFFLINE_MODE) {

            // Get the ID of the oldest tweet
            var maxID;
            var lastTweet = Common.tweets[Common.tweets.length - 1];
            if (lastTweet) {
              maxID = lastTweet.id;
            }

            // Setup API URL with parameters
            var apiString = Common.TIMELINE_API_URL;
            if (maxID) {
              apiString += "?max_id=" + maxID;
            }

            // Fetch more tweets
            Common.authSession.get(apiString)
              .done(function (response) {
                // Append new tweets to existing tweets
                Common.tweets = Common.tweets.concat(response);

                // Update Timeline with new tweets
                MyTimeline.setProps({
                  tweets: Common.tweets
                });

                // DEBUG: For now only fetch once for testing purposes
                //isFetchingTimeline = false;
              })
              .fail(function (err) {
                console.log(err);
                // DEBUG: For now only fetch once for testing purposes
                //isFetchingTimeline = false;
              });
          } else {
            Common.tweets = Common.tweets.concat(Common.sampleTweets1);

            /*
            MyTimeline.setProps({
              tweets: Common.tweets
            });*/

            // In offline mode, only add sampleTweets1 once
            isFetchingTimeline = true;
          }
        }
      }
    });
  }

  // Start of app logic
  if (!Common.OFFLINE_MODE) {
    OAuth.initialize("-fVXfTKkUBGyleKpC6EI7bdL8k4");

    OAuth.popup("twitter")
      .done(function(result) {

        Common.authSession = result;
        console.log(Common.authSession);

        Common.authSession.me()
          .done(function (response) {

            Common.me = response;
            parseUserData();
            handleDataFetchComplete();

          })
          .fail(function (err) {
            console.log(err);
          });

        // Fetch timeline
        Common.authSession.get(Common.TIMELINE_API_URL)
          .done(function (response) {

            Common.tweets = response;
            handleDataFetchComplete();

          })
          .fail(function (err) {
            console.log(err);
          });
      })
      .fail(function (err) {
        console.log(err);
      });
  } else {
    Common.me = Common.sampleMe;
    Common.tweets = Common.sampleTweets2;
    parseUserData();
    handleDataFetchComplete();
  }
});
