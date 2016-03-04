import React from "react";
import ReactDOM from "react-dom";

class Summary extends React.Component {

  render() {
    const data = this.props.data;

    return (
      <section id="summary" className="main-section summary">
        <header>
          <h1 className="section-header">A little more</h1>
        </header>
        <p>If you've gotten this far and still want to know more, here's a very brief, high-level end-to-end career overview...</p>
        <p>{ data.background }</p>
      </section>
    );
  }

}

Summary.propTypes = {};

Summary.defaultProps = {};

export default Summary;
