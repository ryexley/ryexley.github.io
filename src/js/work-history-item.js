import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";

class WorkHistoryItem extends React.Component {

  renderHeaderContent( data ) {
    if( data.website ) {
      return <a href={ data.website }>{ data.company }</a>;
    } else {
      return <span>{ data.company }</span>;
    }
  }

  renderHighlights( data ) {
    if ( data.highlights && data.highlights.length ) {
      return (
        <ul className="work-history--entry-highlights">
          { data.highlights.map( ( item, index ) => {
            const key = _.uniqueId( "work-history-item-" );
            return <li className="work-history--entry-highlight" key={ key }>{ item }</li>;
          } ) }
        </ul>
      );
    }
  }

  render() {
    const data = this.props.data;
    const headerContent = this.renderHeaderContent( data );
    const highlights = this.renderHighlights( data );

    return (
      <div className="work-history-item--container">
        <div className="work-history--summary">
          <header>
            <h3 className="work-history--entry-company">
              { headerContent }
            </h3>
            <h4 className="work-history--entry-position">{ data.position }</h4>
          </header>
          <h5 className="work-history--entry-dates">
            <span className="work-history--entry-date-from-label">From</span>
            <span className="work-history--entry-date-from">{ data.startDate }</span>
            <span className="work-history--entry-date-to-label">to</span>
            <span className="work-history--entry-date-to">{ data.endDate }</span>
          </h5>
          <ul className="keyword-list work-history--entry-keywords">
            { data.keywords.map( keyword => {
              const cleanKeyword = _.clone( keyword ).replace( ".", "" ).toLowerCase();
              const classes = [ "keyword", "work-history--entry-keyword", `keyword-${ cleanKeyword }` ].join( " " );

              return <li className={ classes } key={ cleanKeyword }>{ keyword }</li>;
            } ) }
          </ul>
        </div>
        <div className="work-history--body">
          <p className="work-history--entry-summary">{ data.summary }</p>
          { highlights }
        </div>
      </div>
    );
  }

}

WorkHistoryItem.propTypes = {};

WorkHistoryItem.defaultProps = {};

export default WorkHistoryItem;
