define([
  "react"
], function (
  React
) {
  "use strict";

  var Image = React.createClass({displayName: 'Image',
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
        React.createElement("img", {src: this.props.url, width: this.props.width, height: this.props.height})
      );
    }
  });

  return Image;
});