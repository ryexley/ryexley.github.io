import React from "react";
import ReactDOM from "react-dom";
import WorkHistoryItem from "./work-history-item";

class WorkHistory extends React.Component {

  renderRecentWorkHistory( data ) {
    return (
      <ul className="work-history--featured-list">
      { data.history.map( ( item, index ) => {
        if( index < data.featuredEntryCount ) {
          return (
            <li className="work-history--entry" key={ item.company }>
              <WorkHistoryItem data={ item } />
            </li>
          );
        }
      } ) }
      </ul>
    );
  }

  renderOlderWorkHistory( data ) {
    return (
      <ul className="work-history--older-list">
      { data.history.map( ( item, index ) => {
        if( index >= data.featuredEntryCount ) {
          return (
            <li className="work-history--entry" key={ item.company }>
              <div className="older-work-history--entry--toggle" data-toggle=".older-work-history--entry">
                { item.company } // { item.position } // From { item.startDate }  to { item.endDate } <i className="fa fa-angle-down"></i>
              </div>
              <div className="older-work-history--entry hide">
                <WorkHistoryItem data={ item } />
              </div>
            </li>
          );
        }
      } ) }
      </ul>
    );
  }

  render() {
    const data = this.props.data;
    const recentWorkHistory = this.renderRecentWorkHistory( data );
    const olderWorkHistory = this.renderOlderWorkHistory( data );

    return (
      <section id="work-history" className="main-section work-history">
        <header>
          <h1 className="section-header">Work History</h1>
        </header>
        <div className="work-history--featured">
          { recentWorkHistory }
        </div>
        <h4 className="older-work-history-header">More work history</h4>
        <div className="work-history--older">
          { olderWorkHistory }
        </div>
      </section>

    );
  }

}

WorkHistory.propTypes = {};

WorkHistory.defaultProps = {};

export default WorkHistory;
