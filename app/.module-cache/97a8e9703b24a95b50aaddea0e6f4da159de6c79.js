define([
  "react",
  "components/image"
], function (
  React,
  Image
) {
  "use strict";

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

      var avatarStyle = {
        position: "absolute",
        borderRadius: "4px"
      };

      return (
        React.createElement("div", {className: "tweet-item-parent", style: tweetItemParentStyle}, 
          React.createElement("div", {className: "tweet-avatar"}, 
            React.createElement(Image, {url: this.props.tweet.user.profile_image_url, width: "48px", height: "48px", style: avatarStyle})
          ), 
          React.createElement("div", {className: "tweet-content"}, 
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