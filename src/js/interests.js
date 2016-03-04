import React from "react";
import ReactDOM from "react-dom";
import KeywordList from "./keyword-list";

class Interests extends React.Component {

  render() {
    const data = this.props.data;

    return (
      <section id="interests" className="main-section interests">
        <header>
          <h1 className="section-header">Personal Interests</h1>
        </header>
        <p>In case you're interested...while my favorite things in life are growing old with my wife, and watching and helping my sons grow up, these are a few other things I enjoy when I have the time.</p>
        <ul className="interests--categories">
          { data.map( item => {
            return (
              <li className="interest-category" key={ item.name }>
                <h4>{ item.name }</h4>
                <KeywordList items={ item.keywords } label="interest-category" />
              </li>
            );
          } ) }
        </ul>
      </section>
    );
  }

}

Interests.propTypes = {};

Interests.defaultProps = {};

export default Interests;
