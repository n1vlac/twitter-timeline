define([
  "react",
  "components/image"
], function (
  React,
  Image
) {
  "use strict";

  var TweetAvatarLink = React.createClass({displayName: 'TweetAvatarLink',
    propTypes: {
      user: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        user: {}
      };
    },
    render: function () {
      var userProfileLink = this.props.user.screen_name ? "https://twitter.com/"
        + this.props.user.screen_name : "#";

      var avatarStyle = {
        position: "absolute",
        borderRadius: "4px",
        marginTop: "3px"
      };

      return (
        React.createElement("div", {className: "tweet-avatar"}, 
          React.createElement("a", {href: userProfileLink}, 
            React.createElement(Image, {url: this.props.user.profile_image_url, width: "48px", height: "48px", style: avatarStyle})
          )
        )
      );
    }
  });

  var Tweet = React.createClass({displayName: 'Tweet',
    propTypes: {
      tweet: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        tweet: {}
      };
    },
    render: function () {
      var userProfileLink = this.props.tweet.user ? "https://twitter.com/"
        + this.props.tweet.user.screen_name : null;

      var tweetItemParentStyle = {
        background: "#fff",
        border: "1px solid #e1e8ed",
        borderTop: "none",
        minHeight: "85px",
        padding: "9px 12px"
      };

      var tweetContentStyle = {
        position: "relative",
        marginLeft: "58px"
      };

      return (
        React.createElement("div", {className: "tweet-item-parent", style: tweetItemParentStyle}, 
          React.createElement("div", {className: "tweet-avatar"}, 
            React.createElement("a", {href: userProfileLink}, 
              React.createElement(Image, {url: this.props.tweet.user.profile_image_url, width: "48px", height: "48px", style: avatarStyle})
            )
          ), 
          React.createElement("div", {className: "tweet-content", style: tweetContentStyle}, 
            this.props.tweet.text
          )
        )
      );
    }
  });

  return {
    Tweet: Tweet
  };
});