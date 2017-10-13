/**
 * This is the bootstrap file used by webpack to create a bundle file that can be included as a <script>
 */

// import our shared header component
import { AlphaHeader } from '../angular/src/util/menu-component.ts';

// assign our shared header class to the window
window.AlphaHeader = AlphaHeader;

window._aghRegisterStyles = function() {

	// create style element for the style text
	var styleEl = document.createElement('style');
	styleEl.innerHTML = require( '../../assets/less/styles/header.less' );
	styleEl.id = "agh-styles";
	document.head.appendChild(styleEl);

}

// import the rest of the component
import './alpha-global-header.html';