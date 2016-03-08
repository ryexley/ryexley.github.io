import path from "path";
import _ from "lodash";
import React from "react";
import ReactDOMServer from "react-dom/server";
import when from "when";
import pfs from "promised-io/fs";
import rimraf from "rimraf";
import resumeData from "../resume.json";
import enhancedData from "../resume.enhancements.json";
import ResumeContent from "../js/resume";

function buildContent() {
  console.info( "Building resume content..." );
  return when.promise( ( resolve, reject ) => {
    const content = _.merge( {}, resumeData, enhancedData, {
      work: {
        featuredEntryCount: 3,
        history: resumeData.work
      }
    } );

    resolve( content );
  } );
};

function loadTemplate( content ) {
  console.info( "Loading template..." );
  return when.promise( ( resolve, reject ) => {
    pfs.readFile( path.resolve( __dirname, "../index.tmpl.html" ), "utf-8" ).then( indexTemplate => {
      const template = _.template( indexTemplate );

      resolve( { content, template } );
    } );
  } );
};

function mergeContent( { content, template } ) {
  console.info( "Merging content into template..." );
  return when.promise( ( resolve, reject ) => {
    const data = {
      title: `Resume: ${ content.basics.name }, ${ content.basics.label }`,
      mainContent: ReactDOMServer.renderToStaticMarkup( <ResumeContent data={ content } /> )
    };

    const fileContent = template( data );

    resolve( fileContent );
  } );
};

function writeOutput( fileContent ) {
  console.info( "Writing output to file..." );
  return when.promise( ( resolve, reject ) => {
    const outputFilePath = path.resolve( __dirname, "../../index.html" );
    rimraf( outputFilePath, () => {
      pfs.writeFile( outputFilePath, fileContent ).then( err => {
        if ( err ) {
          reject( err );
        }

        resolve( { success: true, outputFilePath } );
      } );
    } );
  } );
};

function generate() {
  buildContent()
    .then( loadTemplate )
    .then( mergeContent )
    .then( writeOutput )
    .then( ( { success, outputFilePath } ) => {
      if ( success ) {
        console.log( `SUCCESS! Resume generated to: ${ outputFilePath }` );
      } else {
        console.log( "OOPS...something went wrong" );
      }
    } )
    .catch( err => {
      console.log( "Something went wrong", err );
    } );
};

module.exports = { generate };
