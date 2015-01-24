define([
  "react",
  "components/image"
], function (
  React,
  Image
) {
  "use strict";

  // Displays user's avatar as a link to the user's profile
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

  // Displays user's name, username, and how long ago the tweet was sent
  var TweetContentHeader = React.createClass({displayName: 'TweetContentHeader',
    propTypes: {
      tweet: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        tweet: {}
      };
    },
    render: function () {
      var userFullName = this.props.tweet.user && this.props.tweet.user.name
        ? this.props.tweet.user.name : "Twitter User";

      return (
        React.createElement("div", {className: "tweet-content-user-header"}, 
          React.createElement("span", {className: "user-name"}, this.props.tweet.user.name)
        )
      );
    }
  });

  // Full content of a tweet
  var TweetContent = React.createClass({displayName: 'TweetContent',
    propTypes: {
      tweet: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        tweet: {}
      };
    },
    render: function () {
      var tweetContentStyle = {
        position: "relative",
        marginLeft: "58px"
      };

      return (
        React.createElement("div", {className: "tweet-content", style: tweetContentStyle}, 

          this.props.tweet.text
        )
      );
    }
  });

  // A single Tweet
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
      var tweetItemParentStyle = {
        background: "#fff",
        border: "1px solid #e1e8ed",
        borderTop: "none",
        minHeight: "85px",
        padding: "9px 12px"
      };

      return (
        React.createElement("div", {className: "tweet-item-parent", style: tweetItemParentStyle}, 
          React.createElement(TweetAvatarLink, {user: this.props.tweet.user}), 
          React.createElement(TweetContent, {tweet: this.props.tweet})
        )
      );
    }
  });

  return Tweet;
});