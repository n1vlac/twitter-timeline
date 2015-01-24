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
    handleUpdateTweets: function (tweets) {
      this.setProps({
        tweets: tweets
      });
    },
    render: function () {
      var tweets = this.props.tweets.map(function (tweet) {
        return (
          React.createElement(Tweet, {key: tweet.id, tweet: tweet})
        );
      });

      return (
        React.createElement("div", {className: "timeline-parent"}, 
          React.createElement(TweetComposer.TimelineComposer, {avatar_url: this.props.userProfile.avatar, 
            updateTweets: this.handleUpdateTweets}), 
          React.createElement("div", {className: "tweets-parent"}, tweets)
        )
      );
    }
  });

  return Timeline;
});