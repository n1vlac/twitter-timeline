define([
  "react",
  "components/tweet"
], function (
  React,
  Tweet
) {
  "use strict";

  var Timeline = React.createClass({displayName: 'Timeline',
    propTypes: {
      tweets: React.PropTypes.array
    },
    getDefaultProps: function () {
      return {
        tweets: []
      };
    },
    render: function() {
      var tweets = this.props.tweets.map(function (tweet) {
        return (
          React.createElement(Tweet.Tweet, {tweet: tweet})
        );
      });
      return (
        React.createElement("div", null, tweets)
      );
    }
  });

  return Timeline;
});