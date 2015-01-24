define([
  "react",
  "common",
  "components/image"
], function (
  React,
  Common,
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
        inputCharCount: 0,
        newTweetText: ""
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
    handleOnInput: function () {
      // Read text from the DOM node
      var text = this.refs.tweetInput.getDOMNode().value;
      this.setState({
        newTweetText: text,
        inputCharCount: text.length
      });
    },
    handleTweetBtnClick: function () {
      var text = this.state.newTweetText;
      if (!text.trim().length) {
        return false;
      }

      // POST new tweet
      Common.authSession.post(Common.UPDATE_API_URL)
        .done(function (resp) {

        })
        .fail(function (err) {
          console.log(err);
        });

      return false;
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

      var placeholderText = this.state.isExpanded ? "" : this.props.placeholder;
      var numRows = this.state.isExpanded ? "4" : "1";

      // Render char count + tweet button if `isExpanded` is true
      var tweetActionRow;
      if (this.state.isExpanded) {
        var actionRowStyle = {
          textAlign: "right",
          marginTop: "3px",
          marginBottom: "5px"
        };

        var charCountStyle = {
          top: "1px",
          position: "relative",
          color: "#8899a6",
          textShadow: "0 1px 1px rgba(255,255,255,.75)"
        };

        var tweetBtnStyle = {
          marginLeft: "10px",
          backgroundColor: "#0084B4",
          borderColor: "#0084B4",
          opacity: 1,
          fontWeight: "bold",
          padding: "8px 16px"
        };
        var tweetBtnClass = "btn btn-primary";

        var iconEditStyle = {
          paddingRight: "6px",
          top: "2px"
        };

        // # of characters left below limit (can be negative)
        var charsLeft = 140 - this.state.inputCharCount;

        if (charsLeft >= 140 || charsLeft < 0 || !this.state.newTweetText.trim().length) {
          tweetBtnClass += " disabled";
          tweetBtnStyle.opacity = 0.2;
        } else {
          tweetBtnStyle.cursor = "pointer";
        }

        if (charsLeft <= 20 && charsLeft > 10) {
          charCountStyle.color = "#5c0002";
        } else if (charsLeft <= 10) {
          charCountStyle.color = "#d40d12";
        }

        tweetActionRow =
          React.createElement("div", {style: actionRowStyle}, 
            React.createElement("span", {style: charCountStyle}, charsLeft), 
            React.createElement("button", {className: tweetBtnClass, type: "button", style: tweetBtnStyle, 
              onClick: this.handleTweetBtnClick}, 
            React.createElement("span", {className: "glyphicon glyphicon-edit", 'aria-hidden': "true", style: iconEditStyle}), "Tweet")
          );
      }

      return (
        React.createElement("div", {className: "tweet-timeline-composer-parent", style: timelineComposerParentStyle}, 
          React.createElement("div", {className: "tweet-composer-parent", style: timelineParentStyle}, 
            React.createElement("div", {className: "tweet-avatar"}, 
              React.createElement(Image, {url: this.props.avatar_url, width: "32px", height: "32px", style: composerAvatarStyle})
            ), 
            React.createElement("div", {className: "tweet-composer", style: tweetComposerStyle}, 
              React.createElement("div", null, 
              React.createElement("textarea", {ref: "tweetInput", className: "timeline-composer-input", name: "new_tweet", 
                placeholder: placeholderText, rows: numRows, style: inputTextStyle, 
                onFocus: this.handleFocus, onBlur: this.handleOnBlur, onInput: this.handleOnInput})
              ), 
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