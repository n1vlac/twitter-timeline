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
      tweets: React.PropTypes.array,
      userProfile: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        tweets: [],
        userProfile: {}
      };
    },
    handleNewTweetPosted: function (tweet) {
      // Add tweet to the front
      this.props.tweets.unshift(tweet);

      Common.tweets = this.prop.tweets;

      this.setProps({
        tweets: this.props.tweets
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
            newTweetPosted: this.handleNewTweetPosted}), 
          React.createElement("div", {className: "tweets-parent"}, tweets)
        )
      );
    }
  });

  return Timeline;
});