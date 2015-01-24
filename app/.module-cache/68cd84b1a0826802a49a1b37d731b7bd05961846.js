define([
  "react"
], function (
  React
) {
  "use strict";

  var Tweet = React.createClass({displayName: 'Tweet',
    propTypes: {
      width: React.PropTypes.string,
      height: React.PropTypes.string
    },
    getDefaultProps: function () {
      return {};
    },
    render: function() {
      return (
        React.createElement("div", null, "Hello")
      );
    }
  });

  return {
    Tweet: Tweet
  };
});