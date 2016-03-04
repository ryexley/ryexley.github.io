import React from "react";
import ReactDOM from "react-dom";

class Header extends React.Component {

  render() {
    const data = this.props.data;

    return (
      <header className="main basics">
        <div className="main-header--content">
          <h1 className="basics--name">{ data.name }</h1>
          <h3 className="basics--label">{ data.label }</h3>
          <ul className="highlighted-technology-buttons">
            <li className="button button-js" title="JavaScript, my personal favorite"><span>JS</span></li>
            <li className="button button-html5" title="HTML5"><span>HTML5</span></li>
            <li className="button button-css3" title="CSS3"><span>CSS3</span></li>
            <li className="button button-nodejs" title="node.js - Server side JavaScript"><span>node</span></li>
          </ul>
          <p className="basics--summary">{ data.summary }</p>
          <ul className="basics--profiles">
          { data.profiles.map( profile => {
            const classes = [ "basics--profile", `profile-${ profile.network }` ].join( " " );
            return (
              <li className={ classes } key={ profile.network } >
                <a href={ profile.url } title={ profile.tooltip }><span>{ profile.tooltip }</span></a>
              </li>
            );
          } ) }
          </ul>
        </div>
        <a className="scroll-down-indicator" href="#main-content" title="Scroll down to main content"><span>Scroll down</span></a>
      </header>
    );
  }

}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
