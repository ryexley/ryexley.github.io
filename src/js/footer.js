import React from "react";
import ReactDOM from "react-dom";

class Footer extends React.Component {

  render() {
    const data = this.props.data;
    const gravatarStyle = { backgroundImage: `url(${ data.gravatarUrl }?s=250)` };

    return (
      <footer className="main">
        <div className="main-footer--content">
          <div id="contact-details" className="footer--contact-details">
            <h3 className="section-header">Contact Information</h3>
            <div className="picture" style={ gravatarStyle }>
              <span>Just a picture of me</span>
            </div>
            <div className="contact-details--content">
              <div className="contact-detail contact-details--email">{ data.email }</div>
              <div className="contact-detail contact-details--website">{ data.website }</div>
              <div className="contact-detail contact-details--phone">{ data.phone }</div>
              <div className="contact-detail contact-details--location">{ data.location.city }, { data.location.countryCode }</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
