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

  // Text content of a tweet
  var TweetText = React.createClass({displayName: 'TweetText',
    mixins: [TweetMixin],

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

      var image;
      var tweetMediaStyle;
      var tweetText;

      if (photoForDisplay) {
        var imageStyle = {
          marginTop: "-91px"
        };
        tweetMediaStyle = {
          display: "block",
          position: "relative",
          maxHeight: "253px",
          overflow: "hidden",
          margin: 0,
          marginTop: "10px",
          padding: "0",
          borderRadius: "5px"
        };

        image = React.createElement(Image, {url: photoForDisplay.url, style: imageStyle});

        tweetText = this.parseText(photoForDisplay.text);
      } else {
        tweetText = this.parseText(this.props.tweet.text);
      }

      return (
        React.createElement("div", null, 
          React.createElement("div", {className: "tweet-text", style: tweetTextStyle, 
            dangerouslySetInnerHTML: {
              __html: tweetText
            }}), 
          React.createElement("div", {className: "tweet-media", style: tweetMediaStyle}, image)
        )

      );
    }
  });


  // Full content of a tweet
  var TweetContent = React.createClass({displayName: 'TweetContent',
    mixins: [TweetMixin],
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
          React.createElement(TweetText, {tweet: this.props.tweet}), 
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
    handleClick: function (e) {
      debugger;
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
        React.createElement("div", {className: "tweet-item-parent", style: tweetItemParentStyle, onClick: this.handleClick}, 
          React.createElement(TweetAvatarLink, {tweet: this.props.tweet}), 
          React.createElement(TweetContent, {tweet: this.props.tweet})
        )
      );
    }
  });

  return Tweet;
});