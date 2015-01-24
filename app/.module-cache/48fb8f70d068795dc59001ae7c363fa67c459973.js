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