define([
  "react",
  "components/tweet",
  "components/tweet_compose"
], function (
  React,
  Tweet,
  TweetComposer
) {
  "use strict";

  var Timeline = React.createClass({displayName: 'Timeline',
    propTypes: {
      tweets: React.PropTypes.array,
      userProfile: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        tweets: [],
        userProfile: {}
      };
    },
    render: function () {
      var tweets = this.props.tweets.map(function (tweet) {
        return (
          React.createElement(Tweet.Tweet, {key: tweet.id, tweet: tweet})
        );
      });

      return (
        React.createElement("div", {className: "timeline-parent"}, 
          React.createElement(TweetComposer.TimelineComposer, {avatar_url: this.props.userProfile.avatar}), 
          React.createElement("div", {className: "tweets-parent"}, tweets)
        )
      );
    }
  });

  return Timeline;
});