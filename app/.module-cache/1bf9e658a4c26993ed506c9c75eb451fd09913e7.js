require([
  "react",
  "common",
  "components/navbar"
], function (
  React,
  Common,
  Navbar
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

  React.render(
    React.createElement(Navbar.TopNavbar, {navbar_brand: "Twitter Timeline"}),
    document.getElementById("nav-header")
  );

});
