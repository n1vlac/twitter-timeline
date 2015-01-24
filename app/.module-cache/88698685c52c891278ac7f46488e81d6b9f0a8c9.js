define([
  "react",
  "components/image"
], function (
  React,
  Image
) {
  "use strict";

  var TimelineComposer = React.createClass({displayName: 'TimelineComposer',
    propTypes: {
      placeholder: React.PropTypes.string,
      avatar_url: React.PropTypes.string
    },
    getDefaultProps: function () {
      return {
        placeholder: "What's happening?",
        avatar_url: null
      };
    },
    handleFocus: function () {
      this.setProps({
        placeholder: ""
      });
    },
    render: function () {
      var timelineComposerParentStyle = {
        border: "1px solid #BFE0EC",
        borderRadius: "5px 5px 0 0",
        borderBottom: "none"
      };

      var timelineParentStyle = {
        backgroundColor: "#E5F2F7",
        borderRadius: "4px 4px 0 0",
        padding: "10px 12px"
      };

      var tweetComposerStyle = {
        marginLeft: "56px"
      };
      var composerAvatarStyle = {
        position: "absolute",
        left: "28px",
        borderRadius: "4px"
      };
      var inputTextStyle = {
        width: "100%",
        padding: "8px 10px",
        border: "1px solid rgba(0, 132, 180, 0.25)",
        borderRadius: "3px"
      };

      return (
        React.createElement("div", {className: "tweet-timeline-composer-parent", style: timelineComposerParentStyle}, 
          React.createElement("div", {className: "tweet-composer-parent", style: timelineParentStyle}, 
            React.createElement("div", {className: "tweet-avatar"}, 
              React.createElement(Image, {url: this.props.avatar_url, width: "32px", height: "32px", style: composerAvatarStyle})
            ), 
            React.createElement("div", {className: "tweet-composer", style: tweetComposerStyle}, 
              React.createElement("input", {type: "text", name: "new_tweet", placeholder: this.props.placeholder, style: inputTextStyle, 
                onFocus: this.handleFocus, onFocusOut: this.handleFocusOut})
            )
          )
        )
      );
    }
  });

  return {
    TimelineComposer: TimelineComposer
  };
});