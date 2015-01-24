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
      tweets: React.PropTypes.string
    },
    getDefaultProps: function () {
      return {
        tweets: []
      };
    },
    render: function() {
      var tweets = this.props.tweets.map(function (tweet) {
        return (
          React.createElement(Tweet.Tweet, {text: tweet.text})
        );
      });
      return (
        React.createElement("div", null, tweets)
      );
    }
  });

  return Timeline;
});