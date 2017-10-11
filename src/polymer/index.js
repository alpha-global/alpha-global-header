/**
 * This is the bootstrap file used by webpack to create a bundle file that can be included as a <script>
 */

// import our menu measurement util
import { registerMenu } from '../angular/src/util/menu-width.ts';

// import the styles
import * as styleText from '../../assets/less/styles/header.less';

// assign menu func to the window for the component to use
window.registerMenu = registerMenu;

// create style element for the style text
var styleEl = document.createElement('style');
styleEl.innerHTML = styleText;
document.head.appendChild(styleEl);

// import the rest of the component
import './alpha-global-header.html';