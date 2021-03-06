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

      return (
        React.createElement("div", {className: "tweet-action retweet-action", style: actionStyle}, 
          React.createElement("div", {className: "icon icon-retweet"})
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
        margin: "5px"
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