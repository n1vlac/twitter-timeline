define(["react", "components-built/profile"], function (React, Profile) {
  "use strict";

  var TopNavbar = React.createClass({displayName: 'TopNavbar',
    render: function () {
      var signedInAs, profilePic;
      if (this.props.screenName) {
        signedInAs = React.createElement("p", {className: "navbar-text navbar-right"}, "Signed in as ", this.props.screenName);
      }
      return (
        React.createElement("nav", {className: "navbar navbar-default", role: "navigation"}, 
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: "navbar-header"}, 
              React.createElement("a", {className: "navbar-brand", href: "#"}, this.props.navbarBrand)
            ), 
            React.createElement("div", {className: "collapse navbar-collapse"}, 
              signedInAs, " ", profilePic
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