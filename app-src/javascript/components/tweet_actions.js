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

  var TweetReplyButton = React.createClass({
    mixins: [TweetMixin],
    render: function () {
      var actionStyle = {
        cursor: "pointer",
        padding: "0 1px"
      };

      return (
        <div className="tweet-action reply-action" style={actionStyle}>
          <div className="icon icon-reply"></div>
        </div>
      );
    }
  });

  var TweetRetweetButton = React.createClass({
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
        <div className={parentClass} style={actionStyle}>
          <span className={iconClass} style={iconStyle}></span>
          <span className="retweet-count" style={retweetCountStyle}>{retweetCount}</span>
        </div>
      );
    }
  });

  var TweetFavoriteButton = React.createClass({
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
        paddingLeft: "7px"
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
        <div className={parentClass} style={actionStyle}>
          <span className={iconClass} style={iconStyle}></span>
          <span className="favorite-count" style={favoriteCountStyle}>{favoriteCount}</span>
        </div>
      );
    }
  });

  // Footer which has buttons for various tweet actions
  var TweetActionFooter = React.createClass({
    mixins: [TweetMixin],
    render: function () {
      var footerStyle = {
        marginTop: "10px"
      };

      var actionStyle = {
        display: "inline-block",
        marginRight: "38px"
      };

      return (
        <div className="tweet-footer" style={footerStyle}>
          <div className="tweet-footer-action" style={actionStyle}>
            <TweetReplyButton     tweet={this.props.tweet} />
          </div>
          <div className="tweet-footer-action" style={actionStyle}>
            <TweetRetweetButton   tweet={this.props.tweet} />
          </div>
          <div className="tweet-footer-action" style={actionStyle}>
            <TweetFavoriteButton  tweet={this.props.tweet} />
          </div>
        </div>
      );
    }
  });

  return {
    footer: TweetActionFooter
  };
});