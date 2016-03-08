import React from "react";
import ReactDOM from "react-dom";
import Header from "./header";
import ContactDetails from "./contact-details";
import Skills from "./skills";
import WorkHistory from "./work-history";
import OpenSource from "./open-source";
import Publications from "./publications";

class Resume extends React.Component {

  render() {
    const content = this.props.data;

    return (
      <div id="container">
        <Header data={ content.basics } />
        <main id="main-content">
          <ContactDetails data={ content.basics } />
          <Skills data={ content.skills } />
          <WorkHistory data={ content.work } />
          <OpenSource data={ content.openSource } />
          <Publications data={ content.publications } />
        </main>
      </div>
    );
  }

}

Resume.propTypes = {};

Resume.defaultProps = {};

export default Resume;
