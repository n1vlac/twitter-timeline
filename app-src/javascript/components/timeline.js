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

  var Timeline = React.createClass({
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

      Common.tweets = this.props.tweets;

      this.setProps({
        tweets: this.props.tweets
      });
    },
    render: function () {
      var tweets = this.props.tweets.map(function (tweet, i) {
        return (
          <Tweet index={i} key={tweet.id} tweet={tweet} />
        );
      });

      return (
        <div className="timeline-parent">
          <TweetComposer.TimelineComposer
            avatar_url={this.props.userProfile.avatar}
            newTweetPosted={this.handleNewTweetPosted} />
          <div className="tweets-parent">{tweets}</div>
        </div>
      );
    }
  });

  return Timeline;
});