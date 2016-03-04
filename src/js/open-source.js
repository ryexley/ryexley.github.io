import React from "react";
import ReactDOM from "react-dom";

class OpenSource extends React.Component {

  renderProjectName( project ) {
    if( project.url ) {
      return <a href={ project.url }>{ project.projectName }</a>
    } else {
      return <span>{ project.projectName }</span>;
    }
  }

  render() {
    const data = this.props.data;

    return (
      <section id="open-source" className="main-section open-source">
        <header>
          <h1 className="section-header">Open Source / Code</h1>
        </header>
        <p>A collection of open source projects I've either created or contributed to. Should hopefully provide some helpful examples of code I've written, for those interested in that kind of thing.</p>
        <ul className="open-source--list">
          { data.map( project => {
            const projectName = this.renderProjectName( project );

            return (
              <li className="open-source--entry" key={ project.projectName }>
                <h3 className="open-source--entry-name">
                  { projectName }
                </h3>
                <p>{ project.description }</p>
              </li>
            );
          } ) }
        </ul>
      </section>
    );
  }

}

OpenSource.propTypes = {};

OpenSource.defaultProps = {};

export default OpenSource;
