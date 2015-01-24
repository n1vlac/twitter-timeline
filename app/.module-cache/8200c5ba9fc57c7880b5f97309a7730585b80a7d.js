define([
  "react",
  "common",
  "components/tweet",
  "components/tweet_compose"
], function (
  React,
  Common,
  Tweet,
  TweetComposer
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
    render: function () {
      var tweets = this.props.tweets.map(function (tweet) {
        return (
          React.createElement(Tweet.Tweet, {key: tweet.id, tweet: tweet})
        );
      });

      var avatarUrl = Common.me.avatar;

      return (
        React.createElement("div", {className: "timeline-parent"}, 
          React.createElement(TweetComposer.TimelineComposer, {avatar_url: avatarUrl}), 
          React.createElement("div", {className: "tweets-parent"}, tweets)
        )
      );
    }
  });

  return Timeline;
});