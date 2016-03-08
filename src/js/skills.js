import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";

class Skills extends React.Component {

  render() {
    const data = this.props.data;

    return (
      <section id="skills" className="main-section skills">
        <header>
          <h1 className="section-header">Skills and Proficiencies</h1>
        </header>
        <ul className="skill-categories">
        { data.map( skill => {
          return (
            <li className="skill-category" key={ skill.name }>
              <h4>{ skill.name } ({ skill.level })</h4>
              <ul className="skill-category--keywords keyword-list">
              { skill.keywords.map( keyword => {
                const cleanKeyword = _.clone( keyword ).replace( ".", "" ).toLowerCase();
                const classes = [ "keyword", "skill-category--keyword", `keyword-${ cleanKeyword }` ].join( " " );

                return (
                  <li className={ classes } key={ cleanKeyword }>
                    { keyword }
                  </li>
                );
              } ) }
              </ul>
            </li>
          );
        } ) }
        </ul>
      </section>

    );
  }

}

Skills.propTypes = {};

Skills.defaultProps = {};

export default Skills;
