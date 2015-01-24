define([
  "react"
], function (
  React
) {
  "use strict";

  var Timeline = React.createClass({displayName: 'Timeline',
    propTypes: {
      tweets: React.PropTypes.string
    },
    getDefaultProps: function () {
      return {
        tweets: []
      };
    },
    render: function() {
      return (
        React.createElement("img", {src: this.props.url, width: this.props.width, height: this.props.height})
      );
    }
  });

  return {
    Timeline: Timeline
  };
});