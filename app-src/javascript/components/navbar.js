define([
  "react",
  "components/image"
], function (
  React,
  Image) {
  "use strict";

  var TopNavbar = React.createClass({
    render: function () {
      var signedInAs, profilePic;

      // If user profile is available, then display screen name and avatar
      if (this.props.screenName) {
        var profileLink = "https://twitter.com/" + this.props.screenName;
        signedInAs =
          <p className="navbar-text navbar-right">
            Signed in as <a href={profileLink}>{this.props.screenName}</a>
          </p>;

        if (this.props.avatarImgUrl) {
          var profilePicSpanStyle = {
            marginTop: "8px",
            marginLeft: "8px"
          };
          var imageStyle = {
            borderRadius: "4px"
          };

          profilePic =
            <span className="navbar-right" style={profilePicSpanStyle}>
              <a href={profileLink}>
                <Image url={this.props.avatarImgUrl}
                  width="70%" height="70%"
                  style={imageStyle} />
              </a>
            </span>;
        }
      }

      var navStyle = {
        fontWeight: 300,
        boxShadow: "0 0 8px rgba(0,0,0,.14), 0 0 4px rgba(0,0,0,.28)"
      };

      return (
        <nav className="navbar navbar-default navbar-fixed-top" role="navigation" style={navStyle}>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">{this.props.navbarBrand}</a>
              <div className="navbar-center" id="twitter-logo-navbar">
                <div className="twitter-logo-20"></div>
              </div>
            </div>
            <div className="collapse navbar-collapse">
              {profilePic}
              {signedInAs}
            </div>
          </div>
        </nav>
      );
    }
  });

  return {
    TopNavbar: TopNavbar
  };
});