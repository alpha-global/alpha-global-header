/**
 * This is the bootstrap file used by webpack to create a bundle file that can be included as a <script>
 */

// add the styles to the global scope
var styleEl = document.createElement('style');
styleEl.innerHTML = require( '../../assets/less/styles/header.less' );
styleEl.id = "agh-styles";
document.head.appendChild(styleEl);

// import the rest of the component
import './alpha-global-header.html';