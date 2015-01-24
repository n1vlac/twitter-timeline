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
        React.createElement("div", null)
      );
    }
  });

  return {
    Timeline: Timeline
  };
});