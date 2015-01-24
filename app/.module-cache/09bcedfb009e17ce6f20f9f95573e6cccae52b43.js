define([
  "react"
], function (
  React
) {
  "use strict";

  var TweetMixin = {
    propTypes: {
      tweet: React.PropTypes.object
    },
    getDefaultProps: function () {
      return {
        tweet: {}
      };
    },
    getUserScreenName: function () {
      return this.props.tweet.user ? this.props.tweet.user.screen_name : null;
    },
    constructProfileLink: function (screenName) {
      return screenName ? "https://twitter.com/" + screenName : null;
    },
    getUserProfileLink: function () {
      var screenName = this.getUserScreenName();
      return this.constructProfileLink(screenName);
    },
    getUserFullName: function () {
      return this.props.tweet.user && this.props.tweet.user.name
        ? this.props.tweet.user.name : "Twitter User";
    },
    getProfileImageURL: function () {
      return this.props.tweet.user ? this.props.tweet.user.profile_image_url : null;
    },
    getLinkToTweet: function () {
      var idStr = this.props.tweet.id_str;
      if (!idStr) {
        return null;
      }

      if (_.isFunction(this.getUserProfileLink)) {
        return this.getUserProfileLink() + "/status/" + idStr;
      }
    },
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

      var secElapsed = (now - t1) / 1000;
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
    },
    getAbbreviatedCount: function (num) {
      if (!_.isNumber(num)) {
        return null;
      }

      if (num < 1000) {
        return num;
      }

      if (num > 1000 && num < 1000000) {
        return Math.round( num * 1000 ) / 1000;
      }

      return Math.round( num * 10000000 ) / 100010000000;
    }
  };

  return TweetMixin;
});