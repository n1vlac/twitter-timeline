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
        isExpanded: false,
        inputCharCount: 0
      };
    },
    handleFocus: function () {
      this.setState({
        isExpanded: true
      });
    },
    handleOnBlur: function () {
      // Only collapse if the input field char count is empty
      if (this.state.inputCharCount === 0) {
        this.setState({
          isExpanded: false
        });
      }
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

      var placeholderText = !this.state.isExpanded ? "" : this.props.placeholder;
      var numRows = !this.state.isExpanded ? "4" : "1";

      var tweetActionRow;
      if (!this.state.isExpanded) {
        tweetActionRow = React.createElement("div", null, React.createElement("span", null, 140 - this.state.inputCharCount), 
          React.createElement("button", {className: "btn primary-btn tweet-action tweet-btn js-tweet-btn disabled", type: "button", disabled: "disabled"}, 
          React.createElement("span", {className: "Icon Icon--tweet"}), "Tweet"));
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