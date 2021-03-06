define([
  "react",
  "components/profile"
], function (
  React,
  Profile) {
  "use strict";

  var TopNavbar = React.createClass({displayName: 'TopNavbar',
    render: function () {
      var signedInAs, profilePic;
      if (this.props.screenName) {
        var profileLink = "https://twitter.com/" + this.props.screenName;
        signedInAs =
          React.createElement("p", {className: "navbar-text navbar-right"}, 
            "Signed in as ", React.createElement("a", {href: profileLink}, this.props.screenName)
          );

        if (this.props.avatarImgUrl) {
          var profilePicSpanStyle = {
            marginTop: "7px",
            marginLeft: "10px"
          };

          profilePic =
            React.createElement("span", {className: "navbar-right", style: profilePicSpanStyle}, 
              React.createElement("a", {href: profileLink}, 
                React.createElement(Profile.ProfilePic, {url: this.props.avatarImgUrl, width: "70%", height: "70%"})
              )
            );
        }
      }
      return (
        React.createElement("nav", {className: "navbar navbar-default", role: "navigation"}, 
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: "navbar-header"}, 
              React.createElement("a", {className: "navbar-brand", href: "#"}, this.props.navbarBrand)
            ), 
            React.createElement("div", {className: "collapse navbar-collapse"}, 
              React.createElement("div", {className: "navbar-center"}, 
                React.createElement("div", {className: "twitter-logo-20"})
              ), 
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