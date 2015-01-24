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

  var TweetTimeMixin = {
    getMonthAbbreviation: function (monthNum) {
      var abbr;
      switch (monthNum) {
        case 0:
          abbr = "Jan";
          break;
        case 1:
          abbr = "Feb";
          break;
        case 2:
          abbr = "Mar";
          break;
        case 3:
          abbr = "Apr";
          break;
        case 4:
          abbr = "May";
          break;
        case 5:
          abbr = "Jun";
          break;
        case 6:
          abbr = "July";
          break;
        case 7:
          abbr = "Aug";
          break;
        case 8:
          abbr = "Sep";
          break;
        case 9:
          abbr = "Oct";
          break;
        case 10:
          abbr = "Nov";
          break;
        case 11:
          abbr = "Dec";
          break;
        default:
          abbr = null;
      }
      return abbr;
    },
    getTimeElapsed: function (t1) {
      var now = new Date();

      var secElapsed = now - t1 / 1000;
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

      var month = t1.getMonth();
      var day = t1.getDate();
      var year = t1.getFullYear();
      var thisYear = now.getFullYear();

      var monthAbbr = this.getMonthAbbreviation(month);

      if (year !== thisYear) {
        return day + " " + monthAbbr + " " + year;
      }

      return monthAbbr + " " + day;
    },
    getTweetTimeAgo : function () {
      var created = this.props.tweet.created_at;
      if (!created) {
        return null;
      }

      var createdDate = new Date(created);

      return this.getTimeElapsed(createdDate);
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
    mixins: [UserProfileMixin, TweetTimeMixin],
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

      var userFullNameStyle = {
        fontWeight: "bold",
        color: "#292f33"
      };

      return (
        React.createElement("div", {className: "tweet-content-user-header"}, 
          React.createElement("a", {href: userProfileLink}, 
            React.createElement("span", {className: "user-fullname", style: userFullNameStyle}, userFullName), " ", 
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