define(["react"], function (React) {
  "use strict";

  var ProfilePic = React.createClass({displayName: 'ProfilePic',
    propTypes: {
      width: React.PropTypes.string,
      height: React.PropTypes.string
    },
    getDefaultProps: function () {
      return {
        width: "100%",
        height: "100%"
      };
    },
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