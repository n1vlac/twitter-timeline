define(["react"], function (React) {
  "use strict";

  var TopNavbar = React.createClass({displayName: 'TopNavbar',
    render: function () {
      var navRight;
      if (this.props.screenName) {
        navRight = React.createElement("p", {className: "navbar-text navbar-right"}, "Signed in as ", this.props.screenName)
      }
      return (
        React.createElement("nav", {className: "navbar navbar-default", role: "navigation"}, 
          React.createElement("div", {className: "container-fluid"}, 
            React.createElement("div", {className: "navbar-header"}, 
              React.createElement("a", {className: "navbar-brand", href: "#"}, this.props.navbarBrand)
            ), 
            navRight

          )
        )
      );
    }
  });

  return {
    TopNavbar: TopNavbar
  };
});