import React from "react";
import ReactDOM from "react-dom";

class ContactDetails extends React.Component {

  render() {
    const data = this.props.data;

    return (
      <section id="contact-details">
        <div className="contact-details-toggle" data-toggle=".contact-details">Contact info <i className="fa fa-angle-down"></i></div>
        <section className="main-section contact-details hide">
          <h1 className="section-header">Contact Information</h1>
          <div className="contact-details--content">
            <div className="contact-detail contact-details--email">{ data.email }</div>
            <div className="contact-detail contact-details--website">{ data.website }</div>
            <div className="contact-detail contact-details--phone">{ data.phone }</div>
            <div className="contact-detail contact-details--location">{ data.location.city }, { data.location.countryCode }</div>
          </div>
        </section>
      </section>
    );
  }

}

ContactDetails.propTypes = {};

ContactDetails.defaultProps = {};

export default ContactDetails;
