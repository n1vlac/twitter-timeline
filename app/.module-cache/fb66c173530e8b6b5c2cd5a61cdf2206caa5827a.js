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
        signedInAs = React.createElement("p", {className: "navbar-text navbar-right"}, "Signed in as ", this.props.screenName);
      }
      if (this.props.avatarImgUrl) {
        profilePic =
          React.createElement("span", {className: "navbar-right"}, 
            React.createElement(Profile.ProfilePic, {url: this.props.avatarImgUrl})
          );
      }
      return (
        React.createElement("nav", {className: "navbar navbar-default", role: "navigation"}, 
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: "navbar-header"}, 
              React.createElement("a", {className: "navbar-brand", href: "#"}, this.props.navbarBrand)
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