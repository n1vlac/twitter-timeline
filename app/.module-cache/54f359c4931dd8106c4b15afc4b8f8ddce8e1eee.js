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

      var retweetCountStyle = {
        color: "#8899a6",
        fontSize: "12px",
        fontWeight: "bold",
        display: "inline-block",
        top: "-3px",
        position: "relative",
        paddingLeft: "8px"
      };


      var parentClass = "retweet-action not-retweeted";
      var iconClass = "icon-retweet";

      // If tweet is retweeted by the user, change styles
      if (this.props.tweet.retweeted) {
        retweetCountStyle.color = "#79b15a";
        parentClass = "retweet-action is-retweeted";
        iconClass = "icon-retweet-on";
      }

      var retweetCount = this.getAbbreviatedCount(this.props.tweet.retweet_count);

      return (
        React.createElement("div", {className: parentClass, style: actionStyle}, 
          React.createElement("span", {className: iconClass, style: iconStyle}), 
          React.createElement("span", {className: "retweet-count", style: retweetCountStyle}, retweetCount)
        )
      );
    }
  });

  var TweetFavoriteButton = React.createClass({displayName: 'TweetFavoriteButton',
    mixins: [TweetMixin],
    render: function () {
      var actionStyle = {
        cursor: "pointer",
        padding: "0 1px"
      };

      var iconStyle = {
        display: "inline-block"
      };

      var favoriteCountStyle = {
        color: "#8899a6",
        fontSize: "12px",
        fontWeight: "bold",
        display: "inline-block",
        top: "-3px",
        position: "relative",
        paddingLeft: "8px"
      };


      var parentClass = "favorite-action not-favorited";
      var iconClass = "icon-favorite";

      // If tweet is faviroted by the user, change styles
      if (this.props.tweet.favorited) {
        favoriteCountStyle.color = "#fdab42";
        parentClass = "favorite-action is-favorited";
        iconClass = "icon-favorite-on";
      }

      var favoriteCount = this.getAbbreviatedCount(this.props.tweet.favorite_count);

      return (
        React.createElement("div", {className: parentClass, style: actionStyle}, 
          React.createElement("span", {className: iconClass, style: iconStyle}), 
          React.createElement("span", {className: "favorite-count", style: favoriteCountStyle}, favoriteCount)
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
          ), 
          React.createElement("div", {className: "tweet-footer-action", style: actionStyle}, 
            React.createElement(TweetFavoriteButton, {tweet: this.props.tweet})
          )
        )
      );
    }
  });

  return {
    footer: TweetActionFooter
  };
});