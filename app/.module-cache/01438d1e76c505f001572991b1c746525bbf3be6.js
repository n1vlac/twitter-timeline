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

  function parseUserData() {
    // User profile settings
    var userDataRaw = Common.me.raw;

    var bgColor = userDataRaw.profile_background_color ?
      "#" + userDataRaw.profile_background_color : "white";
    var bgImgURL = userDataRaw.profile_background_image_url;
    var useBgImg = userDataRaw.profile_use_background_image;
    var isBgTiled = userDataRaw.profile_background_tile;
    var avatarImgUrl = Common.me.avatar;
    var profileImg = userDataRaw.profile_image_url;
    var profileLinkColor = "#" + userDataRaw.profile_link_color;
    var profileTextColor = userDataRaw.profile_text_color;

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
      + "input[type='text'].timeline-composer-input::-webkit-input-placeholder {"
        + "color: " + profileLinkColor + ";}"
      + "input[type='text'].timeline-composer-input::-moz-placeholder {"
        + "color: " + profileLinkColor + ";}"
      + "input[type='text'].timeline-composer-input:-moz-placeholder {"
        + "color: " + profileLinkColor + ";}"
      + "input[type='text'].timeline-composer-input:-ms-input-placeholder {"
        + "color: " + profileLinkColor + ";}"
      + ".tweet-content-user-header .profile-link:hover .user-fullname,"
        + ".tweet-content-user-header .tweet-link:hover {"
        + "color: " + profileLinkColor + " !important;}"
    );
    $head.append($newStyles);
  }

  function handleDataFetchComplete() {
    if (Common.me && Common.tweets) {
      console.log(Common.me);
      console.log(Common.tweets);

      MyTimeline = React.render(
        React.createElement(Timeline, {tweets: Common.tweets, userProfile: Common.me}),
        document.getElementById("timeline-container")
      );
      setupScrollHandler();
    }
  }

  function setupScrollHandler() {
    var PIXELS_FROM_BOTTOM = 250;
    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() >
        $(document).height() - PIXELS_FROM_BOTTOM) {

        if (!isFetchingTimeline) {
          isFetchingTimeline = true;

          if (!Common.OFFLINE_MODE) {
            var maxID;
            var lastTweet = Common.tweets[Common.tweets.length - 1];
            if (lastTweet) {
              maxID = lastTweet.id;
            }

            var apiString = TIMELINE_API;
            if (maxID) {
              apiString += "?max_id=maxID";
            }

            result.get(apiString)
              .done(function (response) {
                Common.tweets.concat(response);
                MyTimeline.setProps({
                  tweets: Common.tweets
                });
                isFetchingTimeline = false;
              })
              .fail(function (err) {
                console.log(err);
                isFetchingTimeline = false;
              });
          } else {
            Common.tweets.concat(Common.sampleTweets1);
            MyTimeline.setProps({
              tweets: Common.tweets
            });
          }
        }
      }
    });
  }

  if (!Common.OFFLINE_MODE) {
    OAuth.initialize("-fVXfTKkUBGyleKpC6EI7bdL8k4");

    OAuth.popup("twitter")
      .done(function(result) {
        //use result.access_token in your API request
        //or use result.get|post|put|del|patch|me methods (see below)
        var token = result.access_token;
        console.log(result);

        result.me()
          .done(function (response) {
            Common.me = response;
            parseUserData();
            handleDataFetchComplete();
          })
          .fail(function (err) {
            console.log(err);
          });

        // Fetch timeline
        result.get(Common.TIMELINE_API)
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
