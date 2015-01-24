define([
  "react",
  "components/image"
], function (
  React,
  Image) {
  "use strict";

  var TopNavbar = React.createClass({displayName: 'TopNavbar',
    render: function () {
      var signedInAs, profilePic;

      // If user profile is available, then display screen name and avatar
      if (this.props.screenName) {
        var profileLink = "https://twitter.com/" + this.props.screenName;
        signedInAs =
          React.createElement("p", {className: "navbar-text navbar-right"}, 
            "Signed in as ", React.createElement("a", {href: profileLink}, this.props.screenName)
          );

        if (this.props.avatarImgUrl) {
          var profilePicSpanStyle = {
            marginTop: "8px",
            marginLeft: "8px"
          };
          var imageStyle = {
            borderRadius: "4px"
          };

          profilePic =
            React.createElement("span", {className: "navbar-right", style: profilePicSpanStyle}, 
              React.createElement("a", {href: profileLink}, 
                React.createElement(Image, {url: this.props.avatarImgUrl, width: "70%", height: "70%", style: imageStyle})
              )
            );
        }
      }

      var navStyle = {
        fontWeight: 300
      };

      return (
        React.createElement("nav", {className: "navbar navbar-default navbar-fixed-top", role: "navigation", style: navStyle}, 
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: "navbar-header"}, 
              React.createElement("a", {className: "navbar-brand", href: "#"}, this.props.navbarBrand), 
              React.createElement("div", {className: "navbar-center", id: "twitter-logo-navbar"}, 
                React.createElement("div", {className: "twitter-logo-20"})
              )
            ), 
            React.createElement("div", {className: "collapse navbar-collapse"}, 
              profilePic, 
              signedInAs
            )
          )
        )
      );
    }
  });

  return {
    TopNavbar: TopNavbar
  };
});