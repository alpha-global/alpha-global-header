/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_src_util_menu_width_ts__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_less_styles_header_less__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_less_styles_header_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_less_styles_header_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alpha_global_header_html__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alpha_global_header_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__alpha_global_header_html__);
/**
 * This is the bootstrap file used by webpack to create a bundle file that can be included as a <script>
 */

// import our menu measurement util


// import the styles


// assign menu func to the window for the component to use
window.registerMenu = __WEBPACK_IMPORTED_MODULE_0__angular_src_util_menu_width_ts__["a" /* registerMenu */];

// create style element for the style text
var styleEl = document.createElement('style');
styleEl.innerHTML = __WEBPACK_IMPORTED_MODULE_1__assets_less_styles_header_less__;
document.head.appendChild(styleEl);

// import the rest of the component


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getMinMenuWidth */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return registerMenu; });
function merge(obj, defaultProps) {
    for (var prop_1 in defaultProps) {
        if (!obj.hasOwnProperty(prop_1)) {
            obj[prop_1] = defaultProps[prop_1];
        }
    }
    return obj;
}
/**
 * Get property from src
 *
 * @param src
 * @param attr
 * @param defaultValue
 * @returns {*}
*/
function prop(src, attr, defaultValue) {
    return (src && typeof src[attr] !== 'undefined' && src[attr]) || defaultValue;
}
/**
 * We only support rem/em/pt conversion
 * @param val
 * @param options
 * @return {*}
 */
function pxValue(val, options) {
    if (options === void 0) { options = {}; }
    var baseFontSize = parseInt(prop(options, 'base-font-size', 16), 10);
    var value = parseFloat(val);
    var unit = val.replace(value, '');
    // eslint-disable-next-line default-case
    switch (unit) {
        case 'rem':
        case 'em':
            return value * baseFontSize;
        case 'pt':
            return value / (96 / 72);
        case 'px':
            return value;
    }
    throw new Error("The unit " + unit + " is not supported");
}
/**
 * Get canvas element to measure text with
 *
 * @param {*} font
 */
function getContext2d(font) {
    try {
        var ctx = document.createElement('canvas').getContext('2d');
        var dpr = window.devicePixelRatio || 1;
        var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        ctx.font = font;
        ctx.setTransform(dpr / bsr, 0, 0, dpr / bsr, 0, 0);
        return ctx;
    }
    catch (err) {
        throw new Error('Canvas support required');
    }
}
/**
 * Add custom letter and word spacing
 * @param {*} ws
 * @param {*} ls
 */
function addWordAndLetterSpacing(ws, ls) {
    var blacklist = ['inherit', 'initial', 'unset', 'normal'];
    var wordAddon = 0;
    if (ws && blacklist.indexOf(ws) === -1) {
        wordAddon = pxValue(ws);
    }
    var letterAddon = 0;
    if (ls && blacklist.indexOf(ls) === -1) {
        letterAddon = pxValue(ls);
    }
    return function (text) {
        var words = text.trim().replace(/\s+/gi, ' ').split(' ').length - 1;
        var chars = text.length;
        return (words * wordAddon) + (chars * letterAddon);
    };
}
/**
 * Measure the width of text given a font def and custom properties
 *
 * @param {*} text
 * @param {*} font
 * @param {*} overwrites
 */
function measureWidth(text, font, overwrites) {
    if (overwrites === void 0) { overwrites = {}; }
    var letterSpacing = overwrites.letterSpacing || 0;
    var wordSpacing = overwrites.wordSpacing || 0;
    var addSpacing = addWordAndLetterSpacing(wordSpacing, letterSpacing);
    var ctx = getContext2d(font);
    return ctx.measureText(text).width + addSpacing(text);
}
/**
 * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
 */
function getMinMenuWidth(menuContainer, options) {
    var minWidth = 0, options = options || {}, font = options.font || "10px Arial", letterSpacing = options.letterSpacing || 0, itemPadding = options.itemPadding || 0, minItemWidth = options.minItemWidth || 0, wordSpacing = options.wordSpacing || 0, i = 0;
    for (i; i < menuContainer.children.length; i++) {
        var liEl = menuContainer.children[i];
        if (liEl.nodeName !== 'LI') {
            continue;
        }
        var link = liEl.firstElementChild || liEl, text = link.textContent, needed;
        if (text) {
            needed = measureWidth(text, font, { letterSpacing: letterSpacing, wordSpacing: wordSpacing });
        }
        else {
            needed = link.clientWidth;
        }
        // add item padding
        needed += itemPadding;
        //console.info(link.textContent, needed);
        // ensure min item width
        minWidth += needed < minItemWidth ? minItemWidth : needed;
    }
    ;
    return minWidth;
}
function getValueOrVariable(value, el) {
    if (value.indexOf('@') >= 0) {
        var style = getComputedStyle(el), varValue = style.getPropertyValue('--' + value.replace('@', ''));
        if (varValue) {
            value = varValue;
        }
        else {
            return null;
        }
    }
    return value;
}
function getValueOrVariableInt(value, el) {
    var computedValue = getValueOrVariable(value, el);
    return computedValue ? parseInt(computedValue.replace('px', '')) : null;
}
/**
 * Register a nav menu to check it's required size on window resize
 * @param {*} menu
 * @param {*} options
 */
function registerMenu(menu, options) {
    var defaults = {
        minItemSize: 10,
        fontSize: "10px",
        reservedWidth: 50,
        itemPadding: 10 // * x 2
    };
    options = merge(options || {}, defaults);
    // the resize function
    var resizeFunction = function () {
        // extract the supported values
        var reservedWidth = getValueOrVariableInt(options.reservedWidth, menu) || defaults.reservedWidth, minItemSize = getValueOrVariableInt(options.minItemSize, menu) || defaults.minItemSize, itemPadding = getValueOrVariableInt(options.itemPadding, menu) || defaults.itemPadding, fontSize = getValueOrVariable(options.fontSize, menu) || defaults.fontSize;
        // available width the menu has to expand to
        var availWidth = window.innerWidth - reservedWidth;
        // width needed by the menu
        var minWidthNeeded = getMinMenuWidth(menu, {
            font: "600 " + fontSize + " Century Gothic",
            letterSpacing: "0.02em",
            itemPadding: itemPadding * 2,
            minItemWidth: minItemSize
        });
        // small adjustment
        minWidthNeeded += 16;
        //console.info('need at least: ' + minWidthNeeded + ' have available ' + availWidth)
        if (availWidth < minWidthNeeded) {
            if (options.onCollapse) {
                options.onCollapse();
            }
        }
        else {
            if (options.onExpand) {
                options.onExpand();
            }
        }
    };
    function start() {
        stop();
        window.addEventListener('resize', resizeFunction);
    }
    function stop() {
        window.removeEventListener('resize', resizeFunction);
    }
    start();
    return {
        start: start,
        stop: stop,
        check: resizeFunction
    };
}



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "@font-face{\n\tfont-family:\"ITCAvantGardeStd\";\n\tfont-style:normal;\n\tfont-weight:600;\n\tsrc:url(data:application/font-woff;charset=utf-8;base64,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);\n}\n@font-face{\n\tfont-family:\"ITCAvantGardeStd\";\n\tfont-style:normal;\n\tfont-weight:200;\n\tsrc:url(data:application/font-woff;charset=utf-8;base64,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);\n}\n@font-face{\n\tfont-family:\"AlphaIcons\";\n\tfont-weight:normal;\n\tfont-style:normal;\n\tsrc:url(data:application/font-woff;charset=utf-8;base64,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);\n}\n[data-icon]::before,\n[class^=\"icon-\"]::before,\n[class*=\" icon-\"]::before {\n\tfont-family: \"AlphaIcons\" !important;\n\tdisplay: inline-block;\n\tfont-style: normal;\n\tfont-weight: normal;\n\tfont-variant: normal;\n\ttext-transform: none !important;\n\tspeak: none;\n\tline-height: 1;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n[data-icon]::before {\n\tcontent: attr(data-icon);\n}\n.icon-logo::before { content:\"\\64\"; }\n.icon-search::before { content:\"\\67\"; }\n.icon-check::before { content:\"\\76\"; }\n.icon-globe::before { content:\"\\77\"; }\n.icon-close-thin::before { content:\"\\78\"; }\n\n/**\n * These values help control the size of the menu and are used to calculate the available widths\n*/\nhtml.nav-open {\n  overflow: hidden;\n}\n/**\n*\t<alpha-global-header> styles\n*/\nalpha-global-header {\n  --item-size: 84px;\n  --item-padding: 15px;\n  --item-font-size: 18px;\n  --menu-reserved-width: 84px;\n  display: block;\n  position: fixed;\n  z-index: 250000;\n  top: 0;\n  left: 0px;\n  width: 100%;\n  height: 84px;\n  line-height: 1;\n  font-family: \"ITCAvantGardeStd\", \"Century Gothic\", sans-serif;\n  /** Slide out search component */\n  /**\n\t Mobile Nav\n\t**/\n}\nalpha-global-header a {\n  text-decoration: none;\n  display: block;\n  cursor: pointer;\n}\nalpha-global-header ul,\nalpha-global-header li {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  position: relative;\n}\nalpha-global-header #closeButton {\n  display: none;\n}\nalpha-global-header .question-mark {\n  cursor: pointer;\n  color: #e42312;\n  font-size: 35px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 100%;\n  width: var(--item-size);\n  max-width: var(--item-size);\n  min-width: var(--item-size);\n}\nalpha-global-header .menu-wrapper {\n  height: 100%;\n}\nalpha-global-header li a {\n  color: #000000;\n  -webkit-transition:all 0.3s ease-out;\n  -o-transition:all 0.3s ease-out;\n  transition: all 0.3s ease-out;\n}\nalpha-global-header .main-menu {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row nowrap;\n          flex-flow: row nowrap;\n  margin: 0;\n  /** Top level list elements **/\n}\nalpha-global-header .main-menu > li {\n  /** link inside top level element **/\n}\nalpha-global-header .main-menu > li > a {\n  position: relative;\n  z-index: 35;\n  padding-left: var(--item-padding);\n  padding-right: var(--item-padding);\n  height: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: var(--item-font-size);\n  font-weight: 600;\n  letter-spacing: .36px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n}\nalpha-global-header .main-menu > li.search-element {\n  max-width: var(--item-size);\n}\nalpha-global-header .main-menu > li.search-element .menu-search-label {\n  font-size: 24px;\n}\n@media (min-width: 1024px) {\n  alpha-global-header .main-menu > li.search-element .menu-search-label {\n    font-size: 27px;\n  }\n}\nalpha-global-header .main-menu > li.language-menu {\n  max-width: var(--item-size);\n}\nalpha-global-header .main-menu > li.language-menu .language-menu-link {\n  font-size: 0;\n  padding: 0;\n}\nalpha-global-header .sub-menu a {\n  font-weight: 100;\n}\nalpha-global-header .menu-search-area {\n  position: absolute;\n  z-index: 300;\n  left: 100%;\n  height: 100%;\n  width: 100%;\n  background: #fff;\n  -webkit-transform: translateX(0);\n      -ms-transform: translateX(0);\n          transform: translateX(0);\n  -webkit-transition:-webkit-transform 0.3s ease-out;\n  transition:-webkit-transform 0.3s ease-out;\n  -o-transition:transform 0.3s ease-out;\n  transition:transform 0.3s ease-out;\n  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;\n}\nalpha-global-header .menu-search-area form {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\nalpha-global-header .menu-search-area.open {\n  -webkit-transform: translateX(-100%);\n      -ms-transform: translateX(-100%);\n          transform: translateX(-100%);\n}\nalpha-global-header .menu-search-area .search-form-close {\n  cursor: pointer;\n  background-color: #e42312;\n  color: #fff;\n  font-size: 30px;\n  -ms-flex-preferred-size: var(--item-size);\n      flex-basis: var(--item-size);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\nalpha-global-header .menu-search-area .menu-search-input-wrapper {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\nalpha-global-header .menu-search-area .menu-search-input {\n  font-size: 20px;\n  border: none;\n  border-bottom: 1px solid #dfdfdf;\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 20px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\nalpha-global-header:not(.collapsed) .menu-toggle {\n  display: none;\n}\nalpha-global-header:not(.collapsed) #mobileLogo {\n  display: none;\n}\nalpha-global-header:not(.collapsed) .before-menu {\n  border-bottom: 1px solid #dfdfdf;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  min-width: var(--menu-reserved-width);\n  background: #fff;\n}\nalpha-global-header:not(.collapsed) .menu-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  height: 100%;\n}\nalpha-global-header:not(.collapsed) .question-mark {\n  font-size: 45px;\n}\nalpha-global-header:not(.collapsed) .sub-menu {\n  overflow: hidden;\n  position: absolute;\n  z-index: 30;\n  left: 0;\n  top: var(--item-size);\n  min-width: -webkit-max-content;\n  min-width: -moz-max-content;\n  min-width: max-content;\n  width: 100%;\n  height: 0;\n  padding: 0;\n  background: #fff;\n  -webkit-transform: translateY(-100%);\n      -ms-transform: translateY(-100%);\n          transform: translateY(-100%);\n  -webkit-transition:-webkit-transform 0.2s ease-out;\n  transition:-webkit-transform 0.2s ease-out;\n  -o-transition:transform 0.2s ease-out;\n  transition:transform 0.2s ease-out;\n  transition: transform 0.2s ease-out, -webkit-transform 0.2s ease-out;\n}\nalpha-global-header:not(.collapsed) .sub-menu a {\n  padding: 12px 20px;\n}\nalpha-global-header:not(.collapsed) .sub-menu a:hover {\n  background: #fafafa;\n}\nalpha-global-header:not(.collapsed) li:hover > a {\n  color: #e42312;\n}\nalpha-global-header:not(.collapsed) li:hover > .sub-menu {\n  -webkit-transform: translateY(0);\n      -ms-transform: translateY(0);\n          transform: translateY(0);\n  height: auto;\n  border: 1px solid #dfdfdf;\n  border-top: none;\n}\nalpha-global-header:not(.collapsed) li.menu-btn {\n  background-color: #e42312;\n  -webkit-transition:background-color 150ms ease-in-out;\n  -o-transition:background-color 150ms ease-in-out;\n  transition: background-color 150ms ease-in-out;\n}\nalpha-global-header:not(.collapsed) li.menu-btn:after {\n  content: none !important;\n}\nalpha-global-header:not(.collapsed) li.menu-btn:hover {\n  background-color: #b51c0e;\n}\nalpha-global-header:not(.collapsed) li.menu-btn a {\n  color: white;\n  line-height: 1.8;\n}\nalpha-global-header:not(.collapsed) .main-menu {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 1 1116px;\n          flex: 0 1 1116px;\n  /** Top level menu items **/\n}\nalpha-global-header:not(.collapsed) .main-menu > li {\n  border-bottom: 1px solid #dfdfdf;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 0 auto;\n          flex: 1 0 auto;\n  min-width: var(--item-size);\n}\nalpha-global-header:not(.collapsed) .main-menu > li::after {\n  content: \"\";\n  background: #fff;\n  position: absolute;\n  z-index: 32;\n  display: block;\n  width: 100%;\n  height: 100%;\n  border-left: 1px solid #dfdfdf;\n  border-right: 1px solid #dfdfdf;\n}\nalpha-global-header:not(.collapsed) .main-menu > li.bg-darker::after {\n  background-color: #fafafa;\n}\nalpha-global-header:not(.collapsed) .main-menu > li.menu-item-has-children:hover {\n  border-bottom: 1px solid #fff;\n}\nalpha-global-header.collapsed {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 58px;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  background: #fff;\n  border-bottom: 1px solid #dfdfdf;\n}\nalpha-global-header.collapsed.open .menu-wrapper {\n  background: #000000;\n  height: 100%;\n  visibility: visible;\n}\nalpha-global-header.collapsed .menu-toggle {\n  cursor: pointer;\n  padding-left: 11px;\n  padding-right: 11px;\n  width: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column nowrap;\n          flex-flow: column nowrap;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\nalpha-global-header.collapsed .menu-toggle i,\nalpha-global-header.collapsed .menu-toggle:before,\nalpha-global-header.collapsed .menu-toggle:after {\n  background: black;\n  display: block;\n  border-radius: 4px;\n  width: 100%;\n  height: 4px;\n  content: \"\";\n  margin: 2px 0;\n}\nalpha-global-header.collapsed .menu-wrapper {\n  position: fixed;\n  top: 0;\n  z-index: 100;\n  width: 100%;\n  height: 0;\n  overflow-y: scroll;\n  visibility: hidden;\n  background: #000;\n  border: none;\n  -webkit-transition:background 0.3s ease-out;\n  -o-transition:background 0.3s ease-out;\n  transition: background 0.3s ease-out;\n}\nalpha-global-header.collapsed .menu-search-area {\n  display: none;\n  position: static;\n  height: auto;\n  margin-bottom: 20px;\n}\nalpha-global-header.collapsed .menu-search-area .search-form-close {\n  display: none;\n}\nalpha-global-header.collapsed .menu-search-area .menu-search-input {\n  border: 1px solid #dfdfdf;\n}\nalpha-global-header.collapsed .before-menu {\n  display: none;\n}\nalpha-global-header.collapsed .sub-menu {\n  margin: 20px 0;\n  position: static;\n  visibility: visible;\n  display: none;\n  background: none;\n  border: none;\n  width: 100%;\n  -webkit-transform: none;\n      -ms-transform: none;\n          transform: none;\n}\nalpha-global-header.collapsed .sub-menu a {\n  padding: 8px 0;\n  font-size: var(--item-font-size);\n}\nalpha-global-header.collapsed .sub-menu-toggle {\n  cursor: pointer;\n  position: absolute;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 13px 0 0 -5px;\n  height: auto;\n  padding: 10px;\n}\nalpha-global-header.collapsed .sub-menu-toggle::before {\n  content: \"\";\n  position: absolute;\n  border-bottom: none;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-top: 6px solid #fff;\n}\nalpha-global-header.collapsed li {\n  border: none;\n  display: block;\n}\nalpha-global-header.collapsed li a {\n  background: none;\n  height: auto;\n  color: inherit;\n}\nalpha-global-header.collapsed li.search-element {\n  display: none;\n}\nalpha-global-header.collapsed li.menu-btn {\n  color: #e42312;\n}\nalpha-global-header.collapsed li.open > .sub-menu {\n  display: block;\n}\nalpha-global-header.collapsed li.open .sub-menu-toggle::before {\n  border-top: none;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-bottom: 6px solid #fff;\n}\nalpha-global-header.collapsed .menu-container {\n  background: #000;\n  color: #fff;\n}\nalpha-global-header.collapsed .menu-container li a {\n  border: none;\n}\nalpha-global-header.collapsed .main-menu {\n  text-align: center;\n  overflow-y: auto;\n  display: block;\n  padding-top: 50px;\n  /** Top level elements */\n}\nalpha-global-header.collapsed .main-menu > li {\n  margin-bottom: 10px;\n  width: 100%;\n  -webkit-box-flex: initial;\n      -ms-flex: initial;\n          flex: initial;\n  /** link inside top level elements **/\n}\nalpha-global-header.collapsed .main-menu > li > a {\n  display: inline-block;\n  font-size: 24px;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  padding-top: 8px;\n  padding-bottom: 8px;\n  height: auto;\n}\nalpha-global-header.collapsed .main-menu > li.language-menu {\n  max-width: none;\n}\nalpha-global-header.collapsed .main-menu > li.language-menu a {\n  border: none;\n  background: none;\n}\nalpha-global-header.collapsed .main-menu > li.language-menu .icon-globe {\n  display: none;\n}\nalpha-global-header.collapsed .main-menu > li.language-menu .language-menu-link {\n  font-size: 24px;\n  padding: 8px 15px;\n}\nalpha-global-header.collapsed #closeButton {\n  display: block;\n  position: absolute;\n  right: 0;\n  z-index: 100;\n  font-size: 26px;\n  padding: 15px;\n  line-height: 80%;\n  cursor: pointer;\n}\n"

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


const RegisterHtmlTemplate = __webpack_require__(4);

RegisterHtmlTemplate.register("<dom-module id=alpha-global-header> <template> <template is=dom-if if={{home}}> <a class=\"question-mark icon-logo\" id=mobileLogo href=[[home]]></a> </template> <div class=menu-wrapper> <div class=menu-container> <span id=closeButton class=icon-close-thin on-click=close></span> <template is=dom-if if={{home}}> <div class=before-menu> <a class=\"question-mark icon-logo\" href=[[home]]></a> </div> </template> <ul id=mainMenu class=\"main-menu collapsible\"> <slot id=menuSlot></slot> <template is=dom-if if={{languages}}> <li class=\"language-menu bg-darker menu-item menu-item-has-children\"> <a class=icon-globe></a> <a class=language-menu-link href=#>Languages</a> <span class=sub-menu-toggle></span> <ul class=sub-menu> <template is=dom-repeat items={{languages}}> <li class=menu-item><a href=[[item.href]]>[[item.label]]</a></li> </template> </ul> </li> </template> <template is=dom-if if={{search}}> <li class=\"menu-item search-element search-element-toggle\" on-click=toggleSearchInput> <a class=\"menu-search-label icon-search\"></a> </li> <div id=menuSearchArea class$=\"menu-search-area [[searchOpenClass]]\"> <form class=menu-search action=[[searchAction]]> <div class=menu-search-input-wrapper> <input class=menu-search-input type=text name=s value=\"\" placeholder=Search> </div> <div class=\"search-form-close icon-close-thin\" on-click=toggleSearchInput></div> </form> </div> </template> </ul> </div> </div> <div class=menu-toggle on-click=toggleMenu><i></i></div> </template> </dom-module>");

'use strict';

var $htmlClasses = window.document.documentElement.classList;

Polymer({
	is: 'alpha-global-header',
	properties: {
		title: String,
		settings: Object,
		home: String,
		languages: Array,
		search: Boolean,
		searchAction: String
	},
	parseSettings: function () {},
	ready: function () {

		this.parseSettings();

		var _this = this;

		// imported from menu-width.js
		this.menuSizer = registerMenu(this.$.mainMenu, {

			// map config properties to css vars
			minItemSize: "@item-size",
			itemPadding: "@item-padding",
			fontSize: "@item-font-size",
			reservedWidth: "@menu-reserved-width",

			onCollapse: function () {
				_this.classList.add('collapsed');
			},
			onExpand: function () {
				_this.classList.remove('collapsed');
			}
		});

		// add toggles
		this.addSubMenuToggles();

		this.addEventListener('click', function (event) {
			_this.onSiteMenuClick(event);
		});

		requestAnimationFrame(this.menuSizer.check);
	},

	addSubMenuToggles: function () {

		function createToggle() {
			var tog = document.createElement("span");
			tog.classList.add('sub-menu-toggle');
			return tog;
		}

		var subSelector = '.menu-item-has-children > a';

		var childContainers = this.querySelectorAll(subSelector);

		childContainers.forEach(function (item) {
			item.parentNode.insertBefore(createToggle(), item.nextSibling);
		});
	},

	open: function () {
		$htmlClasses.add('nav-open');
		this.classList.add('open');
	},
	/**
 * Close the Menu
 */
	close: function () {
		$htmlClasses.remove('nav-open');
		this.classList.remove('open');
	},

	/**
 * On Site Menu Clicked
 */
	onSiteMenuClick: function (event) {

		if (event.target.classList.contains("alpha-menu-wrapper") || event.target.attributes.getNamedItem("data-menu-close-button")) {

			this.close();
		} else if (event.target.classList.contains('sub-menu-toggle')) {

			this.toggleSubMenu(event);
		}
	},

	/**
 * Toggle Menu
 */
	toggleMenu: function (event) {

		if ($htmlClasses.contains('nav-open')) {
			this.close();
		} else {
			this.open();
		}
	},

	toggleSearchInput: function () {
		this.searchOpenClass = this.searchOpenClass === "open" ? "" : "open";
	},

	/**
 * Sub Menu Toggle Clicked
 */
	toggleSubMenu: function (event) {
		var menu = event.target.parentNode;
		if (menu.classList.contains("open")) {
			menu.classList.remove("open");
		} else {
			menu.classList.add("open");
		}
	}
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* eslint-env browser */

class RegisterHtmlTemplate {
  /**
   * Create a `<template>` element to hold `<dom-module>` content.
   * This bit of code will execute in the context of the main document,
   * calling `importNode` on the `<template>`, which in turn triggers
   * the lifecycle of the `<dom-module>` and allows it to insert its
   * content into Polymer's global module map. When a Polymer element
   * boots up it will fetch its template from this module map.
   * https://github.com/Polymer/polymer/blob/master/lib/mixins/element-mixin.html#L501-L538
   * @param {string} val A `<dom-module>` as an HTML string
   */
  static register(val) {
    let content;
    const template = document.createElement('template');
    template.innerHTML = val;
    if (template.content) {
      content = template.content; // eslint-disable-line prefer-destructuring
    } else {
      content = document.createDocumentFragment();
      while (template.firstChild) {
        content.appendChild(template.firstChild);
      }
    }
    document.importNode(content, true);
  }
  /**
   * Content that will be injected into the main document. This is primarily
   * for things like `<iron-iconset>` and `<custom-style>` which do not have
   * templates but rely on HTML Imports ability to apply content to the main
   * document.
   * @param {string} val An HTML string
   */
  static toBody(val) {
    const trimmedVal = val.trim();
    if (trimmedVal) {
      const div = document.createElement('div');
      div.innerHTML = trimmedVal;
      if (div.firstChild) {
        if (document.body) {
          document.body.insertBefore(div.firstChild, document.body.firstChild);
        } else {
          document.addEventListener('DOMContentLoaded', () => {
            document.body.insertBefore(div.firstChild, document.body.firstChild);
          });
        }
      }
    }
  }
}

module.exports = RegisterHtmlTemplate;

/***/ })
/******/ ]);