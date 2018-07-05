
if ( 'registerElement' in document && 'import' in document.createElement( 'link' ) && 'content' in document.createElement( 'template' ) ) {


} else {

	// polyfill for webcomponents
	require( '../../bower_components/webcomponentsjs/webcomponents-lite.js' );

}

// polyfill for url
require( '../common/url-polyfill.js' );

// include polymer
require( "../../bower_components/polymer/polymer.html" );

// import the rest of the component
require( './index.js' );