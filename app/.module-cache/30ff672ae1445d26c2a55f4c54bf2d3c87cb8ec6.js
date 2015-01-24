define([
  "react",
  "components/image"
], function (
  React,
  Image
) {
  "use strict";

  var UserProfileMixin = {
    getUserScreenName: function () {
      return this.props.tweet.user ? this.props.tweet.user.screen_name : null;
    },
    getUserProfileLink: function () {
      var screenName = this.getUserScreenName();
      return screenName ? "https://twitter.com/" + screenName : "#";
    },
    getUserFullName: function () {
      return this.props.tweet.user && this.props.tweet.user.name
        ? this.props.tweet.user.name : "Twitter User";
    },
    getProfileImageURL: function () {
      return this.props.tweet.user ? this.props.tweet.user.profile_image_url : null;
    }
  };

  // Displays user's avatar as a link to the user's profile
  var TweetAvatarLink = React.createClass({displayName: 'TweetAvatarLink',
    mixins: [UserProfileMixin],
    propTypes: {
      tweet: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        tweet: {}
      };
    },
    render: function () {
      var userProfileLink = this.getUserProfileLink();
      var userProfileImageURL = this.getProfileImageURL();

      var avatarStyle = {
        position: "absolute",
        borderRadius: "4px",
        marginTop: "3px"
      };

      return (
        React.createElement("div", {className: "tweet-avatar"}, 
          React.createElement("a", {href: userProfileLink}, 
            React.createElement(Image, {url: userProfileImageURL, width: "48px", height: "48px", style: avatarStyle})
          )
        )
      );
    }
  });

  // Displays user's name, username, and how long ago the tweet was sent
  var TweetContentHeader = React.createClass({displayName: 'TweetContentHeader',
    mixins: [UserProfileMixin],
    propTypes: {
      tweet: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        tweet: {}
      };
    },
    render: function () {
      var userProfileLink = this.getUserProfileLink();
      var userFullName = this.getUserFullName();
      var userScreenName = "@" + this.getUserScreenName();

      return (
        React.createElement("div", {className: "tweet-content-user-header"}, 
          React.createElement("a", {href: userProfileLink}, 
            React.createElement("span", {className: "user-name"}, userFullName), " ", 
            React.createElement("span", {className: "user-screenname"}, userScreenName), 
            React.createElement("span", {className: "tweet-timeago"}, "· 3m")
          )
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
          React.createElement(TweetContentHeader, {tweet: this.props.tweet}), 
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
          React.createElement(TweetAvatarLink, {tweet: this.props.tweet}), 
          React.createElement(TweetContent, {tweet: this.props.tweet})
        )
      );
    }
  });

  return Tweet;
});