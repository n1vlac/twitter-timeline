define([
  "react"
], function (
  React
) {
  "use strict";

  var Tweet = React.createClass({displayName: 'Tweet',
    propTypes: {
      tweet: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        tweet: {}
      };
    },
    render: function() {
      return (
        React.createElement("div", null, this.props.tweet.text)
      );
    }
  });

  return {
    Tweet: Tweet
  };
});