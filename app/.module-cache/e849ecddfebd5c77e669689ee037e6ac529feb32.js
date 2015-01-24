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

  var TweetMixin = {
    getTimeElapsed: function (t1, t2) {
      var secElapsed = t2 - t1 / 1000;
      if (secElapsed <= 60) {
        return Math.floor(secElapsed) + "s";
      }

      var minElapsed = secElapsed / 60;
      if (minElapsed < 60) {
        return Math.floor(minElapsed) + "m";
      }

      var hrElapsed = minElapsed / 60;
      if (hrElapsed < 24) {
        return Math.floor(hrElapsed) + "h";
      }

      return
    },
    getTweetTimeAgo : function () {
      var created = this.props.tweet.created_at;
      if (!created) {
        return null;
      }

      var createdDate = new Date(created);
      var now = new Date();

      return getTimeElapsed(createdDate, now);
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
    mixins: [UserProfileMixin, TweetMixin],
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
      var tweetTimeAgo = this.getTweetTimeAgo();

      return (
        React.createElement("div", {className: "tweet-content-user-header"}, 
          React.createElement("a", {href: userProfileLink}, 
            React.createElement("span", {className: "user-name"}, userFullName), " ", 
            React.createElement("span", {className: "user-screenname"}, userScreenName)
          ), 
          React.createElement("span", {className: "tweet-timeago"}, " · ", tweetTimeAgo)
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