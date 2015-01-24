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
      var replyActionStyle = {
        cursor: "pointer",
        padding: "0 1px"
      };

      return (
        React.createElement("div", {className: "tweet-action reply-action", style: replyActionStyle}, 
          React.createElement("div", {className: "icon icon-reply"})
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

      return (
        React.createElement("div", {className: "tweet-footer", style: footerStyle}, 
          React.createElement(TweetReplyButton, {tweet: this.props.tweet})
        )
      );
    }
  });

  return {
    footer: TweetActionFooter
  };
});