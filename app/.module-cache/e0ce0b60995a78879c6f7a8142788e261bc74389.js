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
    getInitialState: function () {
      return {
        hasFocus: false
      };
    },
    handleFocus: function () {
      this.setState({
        hasFocus: true
      });
    },
    handleOnBlur: function () {
      this.setState({
        displayPlaceholder: true,
        hasFocus: false
      });
    },
    render: function () {
      var timelineComposerParentStyle = {
        border: "1px solid #BFE0EC",
        borderRadius: "5px 5px 0 0"
      };

      var timelineParentStyle = {
        backgroundColor: "#E5F2F7",
        borderRadius: "4px 4px 0 0",
        padding: "10px 12px 5px"
      };

      var tweetComposerStyle = {
        marginLeft: "56px"
      };

      var composerAvatarStyle = {
        position: "absolute",
        left: "28px",
        top: "14px",
        borderRadius: "4px"
      };

      var inputTextStyle = {
        width: "100%",
        minHeight: "37px",
        padding: "8px 10px 7px",
        border: "1px solid rgba(0, 132, 180, 0.25)",
        borderRadius: "3px",
        resize: "none"
      };

      var placeholderText = !this.state.hasFocus ? this.props.placeholder : "";
      var numRows = !this.state.hasFocus ? "1" : "4";

      var tweetActionRow;
      if (this.state.hasFocus) {
        tweetActionRow = React.createElement("div", null, this.state.inputCharCount)
      }

      return (
        React.createElement("div", {className: "tweet-timeline-composer-parent", style: timelineComposerParentStyle}, 
          React.createElement("div", {className: "tweet-composer-parent", style: timelineParentStyle}, 
            React.createElement("div", {className: "tweet-avatar"}, 
              React.createElement(Image, {url: this.props.avatar_url, width: "32px", height: "32px", style: composerAvatarStyle})
            ), 
            React.createElement("div", {className: "tweet-composer", style: tweetComposerStyle}, 
              React.createElement("textarea", {className: "timeline-composer-input", name: "new_tweet", placeholder: placeholderText, 
                rows: numRows, style: inputTextStyle, onFocus: this.handleFocus, onBlur: this.handleOnBlur}), 
              tweetActionRow
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