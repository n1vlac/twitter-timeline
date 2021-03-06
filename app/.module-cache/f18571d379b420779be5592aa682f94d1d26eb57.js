define([
  "react",
  "components/image",
  "mixins/tweet_mixin"
], function (
  React,
  Image,
  TweetMixin
) {
  "use strict";

  var TweetReplyButton = React.createClass({displayName: 'TweetReplyButton',
    mixins: [TweetMixin],
    render: function () {
      var actionStyle = {
        cursor: "pointer",
        padding: "0 1px"
      };

      return (
        React.createElement("div", {className: "tweet-action reply-action", style: actionStyle}, 
          React.createElement("div", {className: "icon icon-reply"})
        )
      );
    }
  });

  var TweetRetweetButton = React.createClass({displayName: 'TweetRetweetButton',
    mixins: [TweetMixin],
    render: function () {
      var actionStyle = {
        cursor: "pointer",
        padding: "0 1px"
      };

      var iconStyle = {
        display: "inline-block"
      };

      var rewteetCountStyle = {
        color: "#8899a6",
        fontSize: "12px",
        fontWeight: "bold",
        display: "inline-block",
        top: "-3px",
        position: "relative",
        paddingLeft: "8px"
      };

      var parentClass = this.props.tweet.retweeted ?
        "retweet-action is-retweeted" : "retweet-action not-retweeted";

      // Icon class based on `retweeted` flag
      var iconClass = !this.props.tweet.retweeted ?
        "icon-retweet-on" : "icon-retweet"

      return (
        React.createElement("div", {className: parentClass, style: actionStyle}, 
          React.createElement("span", {className: iconClass, style: iconStyle}), 
          React.createElement("span", {className: "retweet-count", style: rewteetCountStyle}, this.props.tweet.retweet_count)
        )
      );
    }
  });

  // Footer which has buttons for various tweet actions
  var TweetActionFooter = React.createClass({displayName: 'TweetActionFooter',
    mixins: [TweetMixin],
    render: function () {
      var footerStyle = {
        marginTop: "10px"
      };

      var actionStyle = {
        display: "inline-block",
        marginRight: "37px"
      };

      return (
        React.createElement("div", {className: "tweet-footer", style: footerStyle}, 
          React.createElement("div", {className: "tweet-footer-action", style: actionStyle}, 
            React.createElement(TweetReplyButton, {tweet: this.props.tweet})
          ), 
          React.createElement("div", {className: "tweet-footer-action", style: actionStyle}, 
            React.createElement(TweetRetweetButton, {tweet: this.props.tweet})
          )
        )
      );
    }
  });

  return {
    footer: TweetActionFooter
  };
});