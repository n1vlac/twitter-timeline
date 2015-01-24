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

  //OAuth.initialize("-fVXfTKkUBGyleKpC6EI7bdL8k4");

  /*
  OAuth.popup("twitter")
    .done(function(result) {
      //use result.access_token in your API request
      //or use result.get|post|put|del|patch|me methods (see below)
      var token = result.access_token;
      console.log(result);
      window.result = result;

      result.me()
        .done(function (response) {
          console.log(response);
          window.me = response;
        })
        .fail(function (err) {
          console.log(err);
        });

      // Fetch timeline
      //result.get("/1.1/statuses/home_timeline.json");
    })
    .fail(function (err) {
      //handle error with err
      console.log(err);
    });
  */

  var AppNavbar = React.render(
    React.createElement(Navbar.TopNavbar, {navbarBrand: "Twitter Timeline"}),
    document.getElementById("nav-header")
  );

  // Profile-specific settings
  var userData = Common.me.data.raw;
  var bgColor = userData.profile_background_color;
  var bgImgURL = userData.profile_background_image_url;
  var useBgImg = userData.profile_use_background_image;
  var isBgTiled = userData.profile_background_tile;
  var avatarImgUrl = Common.me.data.avatar;
  var profileImg = userData.profile_image_url;
  var profileLinkColor = userData.profile_link_color;
  var profileTextColor = userData.profile_text_color;

  var screenName = userData.screen_name;
  var userName = userData.name;

  // Pass user info to navbar for display
  AppNavbar.setProps({
    screenName: screenName,
    avatarImgUrl: avatarImgUrl
  });

  if (useBgImg && bgImgURL) {
    var $body = $("body");
    var bgCSS = bgImgURL;
    if (!isBgTiled) {
      bgCSS += " no-repeat";
    }
    $body.css("background", bgCSS);
  }

  var Timeline = React.render(
    React.createElement(Timeline, {tweets: Common.tweets}),
    document.getElementById("timeline-container")
  );

  console.log(Common.me);
  console.log(Common.tweets);
});
