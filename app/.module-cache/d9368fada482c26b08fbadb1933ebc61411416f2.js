define(["react"], function (React) {
  "use strict";

  var ProfilePic = React.createClass({displayName: 'ProfilePic',
    render: function() {
      return (
        React.createElement("img", {src: this.props.url})
      );
    }
  });

  return {
    ProfilePic: ProfilePic
  };
});