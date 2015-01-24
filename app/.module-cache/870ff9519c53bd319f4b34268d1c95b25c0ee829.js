define([
  "react",
  "components/image",
  "components/tweet_actions",
  "mixins/tweet_mixin"
], function (
  React,
  Image,
  TweetActions,
  TweetMixin
) {
  "use strict";

  // Displays user's avatar as a link to the user's profile
  var TweetAvatarLink = React.createClass({displayName: 'TweetAvatarLink',
    mixins: [TweetMixin],
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
    mixins: [TweetMixin],
    render: function () {
      var userProfileLink = this.getUserProfileLink();
      var userFullName = this.getUserFullName();
      var userScreenName = "@" + this.getUserScreenName();
      var tweetTimeAgo = this.getTweetTimeAgo();
      var tweetLink = this.getLinkToTweet();

      var userFullNameStyle = {
        fontWeight: "bold",
        color: "#292f33"
      };
      var userScreenNameStyle = {
        color: "#8899a6",
        fontSize: "13px"
      };
      var tweetTimeAgoStyle = {
        color: "#8899a6",
        fontSize: "13px"
      };

      return (
        React.createElement("div", {className: "tweet-content-user-header"}, 
          React.createElement("a", {className: "profile-link", href: userProfileLink}, 
            React.createElement("span", {className: "user-fullname", style: userFullNameStyle}, userFullName), " ", 
            React.createElement("span", {className: "user-screenname", style: userScreenNameStyle}, userScreenName)
          ), 
          React.createElement("span", {className: "tweet-timeago", style: tweetTimeAgoStyle}, " · ", 
            React.createElement("a", {className: "tweet-link", href: tweetLink, style: tweetTimeAgoStyle}, tweetTimeAgo)
          )
        )
      );
    }
  });

  // Body of a tweet (text + image)
  var TweetBody = React.createClass({displayName: 'TweetBody',
    mixins: [TweetMixin],
    propTypes: {
      collapsed: React.PropTypes.bool
    },
    getDefaultProps: function () {
      return {
        collapsed: true
      };
    },
    // Parse tweet text for image to display with the tweet
    parseTextForDisplayPhoto: function () {
      var media = this.props.tweet.entities.media;
      if (!media || !media.length) {
        return null;
      }

      // Display first photo
      var photo = _.first(media);
      var url = photo.media_url;

      var indices = photo.indices;
      var text = this.props.tweet.text.substr(0, indices[0]) +
        this.props.tweet.text.substr(indices[1]);

      return {
        url: url,
        text: text
      };
    },
    // Parse tweet text for links
    parseTextForLinks: function (text) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      text = text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
      exp = /(^|\s)#(\w+)/g;
      text = text.replace(exp, "$1<a href='https://www.twitter.com/hashtag/$2' target='_blank'>#$2</a>");
      exp = /(^|\s)@(\w+)/g;
      text = text.replace(exp, "$1<a href='https://www.twitter.com/$2' target='_blank'>@$2</a>");
      return text;
    },
    parseText: function (text) {
      text = text.replace(/[\n\r]/g, "<br/>");
      text = this.parseTextForLinks(text);

      return text;
    },
    render: function () {
      var tweetTextStyle = {
        lineHeight: "18px"
      };

      var photoForDisplay = this.parseTextForDisplayPhoto();

      var tweetMedia;
      var tweetText;

      // If the tweet has a photo or not
      if (photoForDisplay) {
        var imageStyle;

        var tweetMediaStyle = {
          display: "block",
          position: "relative",
          overflow: "hidden",
          margin: 0,
          marginTop: "10px",
          padding: 0,
        };

        if (this.props.collapsed) {
          tweetMediaStyle.maxHeight = "253px";
          tweetMediaStyle.borderRadius = "5px";

          imageStyle = { marginTop: "-91px" };
        }

        var image = React.createElement(Image, {url: photoForDisplay.url, style: imageStyle});
        tweetMedia = React.createElement("div", {className: "tweet-media", style: tweetMediaStyle}, image)

        tweetText = this.parseText(photoForDisplay.text);
      } else {
        tweetText = this.parseText(this.props.tweet.text);
      }

      // Tweet body footer - has timestamp and Details link
      var bodyFooter;
      if (!this.props.collapsed) {
        var createdTimestamp = this.getTweetTimestamp();
        var tweetLink = this.getLinkToTweet();

        var bodyFooterStyle = {
          color: "#8899a6",
          fontSize: "13px",
          marginTop: "15px"
        };

        var tweetLinkStyle = {
          color: "#8899a6"
        };

        bodyFooter = React.createElement("div", {className: "tweet-body-footer", style: bodyFooterStyle}, 
          createdTimestamp, " · ", 
          React.createElement("a", {href: tweetLink, style: tweetLinkStyle}, "Details")
          );
      }

      return (
        React.createElement("div", null, 
          React.createElement("div", {className: "tweet-text", style: tweetTextStyle, 
            dangerouslySetInnerHTML: {
              __html: tweetText
            }}), 
          tweetMedia, 
          bodyFooter
        )

      );
    }
  });


  // Full content of a tweet
  var TweetContent = React.createClass({displayName: 'TweetContent',
    mixins: [TweetMixin],
    propTypes: {
      collapsed: React.PropTypes.bool
    },
    getDefaultProps: function () {
      return {
        collapsed: true
      };
    },
    render: function () {
      var tweetContentStyle = {
        position: "relative",
        marginLeft: "58px"
      };

      var tweetContentFooterStyle = {
        height: "28px",
        paddingTop: "1px"
      };

      return (
        React.createElement("div", {className: "tweet-content", style: tweetContentStyle}, 
          React.createElement(TweetContentHeader, {tweet: this.props.tweet}), 
          React.createElement(TweetBody, {tweet: this.props.tweet, collapsed: this.props.collapsed}), 
          React.createElement("div", {className: "tweet-content-footer-parent", style: tweetContentFooterStyle}, 
            React.createElement(TweetActions.footer, {tweet: this.props.tweet})
          )
        )
      );
    }
  });

  // A single Tweet
  var Tweet = React.createClass({displayName: 'Tweet',
    mixins: [TweetMixin],
    getInitialState: function () {
      return {
        collapsed: true
      };
    },
    handleClick: function (e) {
      if (e.target.tagName.toUpperCase() !== "A") {
        var $target = $(e.target);

        // Check if any of click origin's parents is a link
        if (!$target.parentsUntil(".tweet-item-parent", "a").length) {
          this.setState({
            collapsed: !this.state.collapsed
          });
        }
      }
    },
    render: function () {
      var tweetItemParentStyle = {
        background: "#fff",
        border: "1px solid #e1e8ed",
        borderTop: "none",
        minHeight: "85px",
        padding: "9px 12px",
        cursor: "pointer"
      };

      if (!this.state.collapsed) {
        tweetItemParentStyle.marginBottom = "8px";

        if (this.props.index !== 0) {
          _.extend(tweetItemParentStyle, {
            marginTop: "8px",
            borderRadius: "6px"
          });
        } else {
          _.extend(tweetItemParentStyle, {
            borderBottomLeftRadius: "6px",
            borderBottomRightRadius: "6px"
          });
        }

      }

      return (
        React.createElement("div", {className: "tweet-item-parent", style: tweetItemParentStyle, onClick: this.handleClick}, 
          React.createElement(TweetAvatarLink, {tweet: this.props.tweet}), 
          React.createElement(TweetContent, {tweet: this.props.tweet, collapsed: this.state.collapsed})
        )
      );
    }
  });

  return Tweet;
});