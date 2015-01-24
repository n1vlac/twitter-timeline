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
    render: function() {
      return (
        React.createElement("div", {className: "tweet"}, 
          React.createElement("div", {className: "tweet-avatar"}, 
            React.createElement(Image, {url: this.props.tweet.user.profile_image_url, width: "73px", height: "73px"})
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