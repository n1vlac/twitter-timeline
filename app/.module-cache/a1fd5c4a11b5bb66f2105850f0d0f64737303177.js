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
      placeholder: React.PropTypes.string
    },
    getDefaultProps: function () {
      return {
        placeholder: "What's happening?"
      };
    },
    render: function() {
      return (
        React.createElement("div", {className: "tweet-timeline-composer-parent"}, 
          React.createElement("div", {className: "tweet-avatar"}, 
            React.createElement(Image, {url: this.props.avatar_url, width: "48px", height: "48px"})
          ), 
          React.createElement("div", {className: "tweet-composer"}, 
            React.createElement("input", {type: "text", name: "new_tweet", placeholder: this.props.placeholder})
          )
        )
      );
    }
  });

  return {
    TimelineComposer: TimelineComposer
  };
});