import React from "react";
import ReactDOM from "react-dom";

class Publications extends React.Component {

  renderPublicationName( publication ) {
    if( publication.website ) {
      return <a href={ publication.website }>{ publication.name }</a>;
    } else {
      return <span>{ publication.name }</span>;
    }
  }

  render() {
    const data = this.props.data;

    return (
      <section id="publications" className="main-section publications">
        <header>
          <h1 className="section-header">Publications / Writings</h1>
        </header>
        <p>Some things I've written...</p>
        <ul className="publications-list">
          { data.map( publication => {
            const publicationName = this.renderPublicationName( publication );

            return (
              <li className="publications--entry" key={ publication.name }>
                <h3 className="publication--entry-name">
                  { publicationName }
                </h3>
                <p>{ publication.summary }</p>
              </li>
            );
          } ) }
        </ul>
      </section>
    );
  }

}

Publications.propTypes = {};

Publications.defaultProps = {};

export default Publications;
