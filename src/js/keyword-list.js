import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";

class KeywordList extends React.Component {

  render() {
    const label = this.props.label;
    const items = this.props.items;
    const classes = [ "keyword-list", `${ label }--keywords` ].join( " " );

    return (
      <ul className={ classes }>
        { items.map( ( keyword, index ) => {
          const cleanKeyword = _.clone( keyword ).replace( ".", "" ).toLowerCase();
          const classes = [ "keyword", `${ label }--keyword`, `keyword-${ cleanKeyword }` ].join( " " );
          const key = `${ label }-keyword-${ index }`;

          return (
            <li className={ classes } key={ cleanKeyword } key={ key }>
              { keyword }
            </li>
          );
        } ) }
      </ul>
    );
  }

}

KeywordList.propTypes = {};

KeywordList.defaultProps = {};

export default KeywordList;
