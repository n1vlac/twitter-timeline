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
      return (
        React.createElement("span", {className: "icon icon-reply"}
        )
      );
    }
  });

  // Footer which has buttons for various tweet actions
  var TweetActionFooter = React.createClass({displayName: 'TweetActionFooter',
    mixins: [TweetMixin],
    render: function () {
      return (
        React.createElement("div", {className: "tweet-footer"}
        )
      );
    }
  });

  return {
    footer: TweetActionFooter
  };
});