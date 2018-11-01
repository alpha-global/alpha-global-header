(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('alpha-global-header', ['exports', '@angular/core', '@angular/router', '@angular/common'], factory) :
    (factory((global['alpha-global-header'] = {}),global.ng.core,global.ng.router,global.ng.common));
}(this, (function (exports,core,router,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    // reference to document element classes
    /** @type {?} */
    var htmlClasses = document.documentElement.classList;
    /** @type {?} */
    var ITEM_SIZE = 84;
    /** @type {?} */
    var ITEM_MAX_PADDING = 50;
    /** @type {?} */
    var ITEM_MIN_PADDING = 15;
    /** @type {?} */
    var ITEM_FONT_SIZE = 18;
    /** @type {?} */
    var MENU_RESERVED_WIDTH = 84;
    // the logo is only required space
    /**
     * This class is used in polymer and angular to construct and manage the menu
     */
    var 
    // the logo is only required space
    /**
     * This class is used in polymer and angular to construct and manage the menu
     */
    AlphaHeader = /** @class */ (function () {
        function AlphaHeader(element, options) {
            var _this = this;
            this.element = element;
            this.defaults = {
                minItemSize: 10,
                fontSize: "10px",
                reservedWidth: 50,
                itemPadding: 10,
                // * x 2,
                toolBarItemSelector: '[toolbar-item]',
                closeSubMenusOnClick: false,
                languages: []
            };
            this.isCollapsed = false;
            this.isMinified = false;
            this.state = '';
            this.menuContainer = this.element.querySelector('[menu-container]');
            this.options = merge(options || {}, this.defaults);
            this.attachToolbarElements();
            if (this.options.languages.length) {
                this.menuContainer.appendChild(this.createLanguageMenu('no-cursor'));
            }
            // create sub menu toggles
            this.attachSubMenuToggles();
            // create toolbar menu after sub-menu toggle
            if (this.options.languages.length) {
                this.toolBar.insertBefore(this.createLanguageMenu('sub-menu-toggle'), this.toolBar.firstChild);
            }
            if (this.options.search) {
                this.createSearchArea();
            }
            requestAnimationFrame(function () {
                _this.check();
                _this.element.classList.add('ready');
            });
            this._boundResizeFunction = this.check.bind(this);
            this._boundClickFunction = this.onClick.bind(this);
            this._boundWindowClickFunction = this.onWindowClick.bind(this);
            window.addEventListener('resize', this._boundResizeFunction);
            this.element.addEventListener('click', this._boundClickFunction);
            window.addEventListener('click', this._boundWindowClickFunction);
        }
        /**
         * Listen to clicks on the window to close open nav menus
         */
        /**
         * Listen to clicks on the window to close open nav menus
         * @param {?} event
         * @return {?}
         */
        AlphaHeader.prototype.onWindowClick = /**
         * Listen to clicks on the window to close open nav menus
         * @param {?} event
         * @return {?}
         */
            function (event) {
                // if the click came from the menu, dont do anything
                if (event.isMenuClick) {
                    return;
                }
                this.closeSubMenus();
            };
        /**
         * Handle clicks on different elements
         */
        /**
         * Handle clicks on different elements
         * @param {?} event
         * @return {?}
         */
        AlphaHeader.prototype.onClick = /**
         * Handle clicks on different elements
         * @param {?} event
         * @return {?}
         */
            function (event) {
                event.isMenuClick = true;
                if (this.options.closeSubMenusOnClick && !document.documentElement.classList.contains('nav-open')) {
                    // close sub-menus if the click came from there
                    /** @type {?} */
                    var menuContainer = event.composedPath().filter(function (el) { return el.classList && el.classList.contains('sub-menu'); });
                    if (menuContainer.length) {
                        /** @type {?} */
                        var parentEl = menuContainer[0].parentElement;
                        if (parentEl.classList.contains('open')) {
                            parentEl.classList.remove('open');
                        }
                        else {
                            this.spoofCloseSubMenu(parentEl);
                        }
                        return;
                    }
                }
                /**
                 * Sub menu toggle clicks
                 */
                if (event.target.classList.contains('sub-menu-toggle')) {
                    /** @type {?} */
                    var menutarget = void 0;
                    if (event.target.classList.contains('menu-item-has-children')) {
                        menutarget = event.target;
                    }
                    else {
                        menutarget = event.target.parentNode;
                    }
                    /** @type {?} */
                    var isOpen = menutarget.classList.contains('open');
                    this.closeSubMenus();
                    if (isOpen) {
                        menutarget.classList.remove('open');
                    }
                    else {
                        menutarget.classList.add('open');
                    }
                }
                else if (event.target.classList.contains('search-form-close')) {
                    this.closeSearch();
                }
                else if (event.target.classList.contains('search-icon')) {
                    this.openSearch();
                }
                else if (event.target.classList.contains('menu-toggle')) {
                    this.open();
                }
                else if (event.target.id === 'closeButton') {
                    this.close();
                }
            };
        /**
         * In angular situations, the page doesn't navigate, so a hovered sub-menu will remain open after a click
         * This will
         */
        /**
         * In angular situations, the page doesn't navigate, so a hovered sub-menu will remain open after a click
         * This will
         * @param {?} element
         * @return {?}
         */
        AlphaHeader.prototype.spoofCloseSubMenu = /**
         * In angular situations, the page doesn't navigate, so a hovered sub-menu will remain open after a click
         * This will
         * @param {?} element
         * @return {?}
         */
            function (element) {
                element.style.height = ITEM_SIZE + 'px';
                element.style.pointerEvents = 'none';
                setTimeout(function () {
                    element.style.height = '';
                    element.style.pointerEvents = '';
                }, 100);
            };
        /**
         * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
         */
        /**
         * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
         * @param {?} options
         * @return {?}
         */
        AlphaHeader.prototype.getCollapsedMenuWidth = /**
         * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
         * @param {?} options
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var minWidth = 0;
                /** @type {?} */
                var options = options || {};
                /** @type {?} */
                var font = options.font || "10px Arial";
                /** @type {?} */
                var letterSpacing = options.letterSpacing || 0;
                /** @type {?} */
                var itemPadding = options.itemPadding || 0;
                /** @type {?} */
                var minItemWidth = options.minItemWidth || 0;
                /** @type {?} */
                var wordSpacing = options.wordSpacing || 0;
                /** @type {?} */
                var excludeIcons = options.excludeIcons || false;
                /** @type {?} */
                var i = 0;
                for (i; i < this.menuContainer.children.length; i++) {
                    /** @type {?} */
                    var liEl = this.menuContainer.children[i];
                    /** @type {?} */
                    var link = liEl.firstElementChild || liEl;
                    /** @type {?} */
                    var text = link.textContent;
                    /** @type {?} */
                    var needed;
                    if (text) {
                        needed = this.measureWidth(text, font, { letterSpacing: letterSpacing, wordSpacing: wordSpacing }) + itemPadding;
                    }
                    else if (!excludeIcons) {
                        needed = minItemWidth;
                    }
                    else {
                        continue;
                    }
                    //console.info(link.textContent, needed);
                    // ensure min item width
                    minWidth += needed < minItemWidth ? minItemWidth : needed;
                }
                return minWidth;
            };
        /**
         * Move toolbar elements into the toolbar from the menu
         *
         */
        /**
         * Move toolbar elements into the toolbar from the menu
         *
         * @return {?}
         */
        AlphaHeader.prototype.attachToolbarElements = /**
         * Move toolbar elements into the toolbar from the menu
         *
         * @return {?}
         */
            function () {
                // create the toolbar container
                this.toolBar = document.createElement('div');
                this.toolBar.classList.add('menu-toolbar');
                // add a search icon
                if (this.options.search) {
                    /** @type {?} */
                    var searchIcon = this.createSearchIcon();
                    this.toolBar.appendChild(searchIcon);
                }
                // add the menu icon
                /** @type {?} */
                var menuToggle = document.createElement('a');
                menuToggle.classList.add('menu-toggle');
                menuToggle.innerHTML = '<i></i>';
                this.toolBar.appendChild(menuToggle);
                // add the close button
                /** @type {?} */
                var closeButton = document.createElement('span');
                closeButton.id = 'closeButton';
                closeButton.classList.add('agh-icon-close-thin');
                this.element.appendChild(closeButton);
                // append the toolbar
                this.element.appendChild(this.toolBar);
                // find dynamic toolbar items from the user markup
                /** @type {?} */
                var items = this.menuContainer.querySelectorAll(this.options.toolBarItemSelector);
                /** @type {?} */
                var i = 0;
                /** @type {?} */
                var len = items.length;
                for (i; i < len; i++) {
                    /** @type {?} */
                    var item = items[i];
                    this.toolBar.insertBefore(item, this.toolBar.firstChild);
                }
            };
        /**
         * Create the language menu
         */
        /**
         * Create the language menu
         * @param {?=} extraClass
         * @return {?}
         */
        AlphaHeader.prototype.createLanguageMenu = /**
         * Create the language menu
         * @param {?=} extraClass
         * @return {?}
         */
            function (extraClass) {
                if (extraClass === void 0) {
                    extraClass = '';
                }
                if (this.options.languages.length === 0) {
                    return null;
                }
                /** @type {?} */
                var languageElement = document.createElement('div');
                languageElement.classList.add('menu-item-has-children');
                languageElement.setAttribute('menu-icon', 'w');
                languageElement.setAttribute('menu-title', 'Languages');
                if (extraClass) {
                    languageElement.classList.add(extraClass);
                }
                /** @type {?} */
                var subMenu = '<ul class="sub-menu">';
                /** @type {?} */
                var i = 0;
                /** @type {?} */
                var len = this.options.languages.length;
                for (i; i < len; i++) {
                    /** @type {?} */
                    var language = this.options.languages[i];
                    /** @type {?} */
                    var href = 'javascript:void(0)';
                    /** @type {?} */
                    var attr = '';
                    if (language.code) {
                        attr = 'data-lang="' + language.code + '"';
                    }
                    else if (language.href) {
                        href = language.href;
                    }
                    subMenu += '<li><a ' + attr + ' href="' + href + '">' + language.label + '</a></li>';
                }
                subMenu += '</ul>';
                languageElement.innerHTML = subMenu;
                languageElement.addEventListener('click', function (event) {
                    /** @type {?} */
                    var code = null;
                    if (null !== (code = (( /** @type {?} */(event.target))).getAttribute('data-lang'))) {
                        /** @type {?} */
                        var url = new URL(document.location.href);
                        url.searchParams.delete('lang');
                        url.searchParams.append('lang', code);
                        document.location.href = url.href;
                    }
                });
                return languageElement;
            };
        /**
         * Create an icon to open the search
         */
        /**
         * Create an icon to open the search
         * @return {?}
         */
        AlphaHeader.prototype.createSearchIcon = /**
         * Create an icon to open the search
         * @return {?}
         */
            function () {
                /** @type {?} */
                var searchIcon = document.createElement('div');
                searchIcon.classList.add('search-icon');
                searchIcon.setAttribute('menu-icon', 'g');
                return searchIcon;
            };
        /**
         * Create the search area
         */
        /**
         * Create the search area
         * @return {?}
         */
        AlphaHeader.prototype.createSearchArea = /**
         * Create the search area
         * @return {?}
         */
            function () {
                // create the search form
                this.searchArea = document.createElement('div');
                this.searchArea.classList.add('menu-search-area');
                // form action
                /** @type {?} */
                var searchAction = this.options.search.action || "";
                // create a URL from the search action
                /** @type {?} */
                var searchUrl = new URL(searchAction, document.location.origin);
                // get the form target
                /** @type {?} */
                var formTarget = searchUrl.hostname !== document.location.hostname ? '_blank' : '_self';
                // the form markup
                this.searchArea.innerHTML =
                    "<form target=\"" + formTarget + "\" class=\"menu-search\" action=\"" + searchAction + "\">\n\t\t\t\t<div class=\"menu-search-input-wrapper\">\n\t\t\t\t\t<input class=\"menu-search-input\" type=\"text\" name=\"s\" value=\"\" placeholder=\"Search\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"search-form-close agh-icon-close-thin\"></div>\n\t\t\t</form>";
                // create the toggle
                /** @type {?} */
                var searchIcon = this.createSearchIcon();
                // attach them
                this.menuContainer.appendChild(searchIcon);
                this.menuContainer.parentElement.appendChild(this.searchArea);
            };
        /**
         * Attach sub menu toggles
         */
        /**
         * Attach sub menu toggles
         * @return {?}
         */
        AlphaHeader.prototype.attachSubMenuToggles = /**
         * Attach sub menu toggles
         * @return {?}
         */
            function () {
                /** @type {?} */
                var subMenus = this.element.querySelectorAll('.sub-menu');
                /** @type {?} */
                var i = 0;
                /** @type {?} */
                var len = subMenus.length;
                for (i; i < len; i++) {
                    /** @type {?} */
                    var subMenu = subMenus[i];
                    /** @type {?} */
                    var toggle = document.createElement('span');
                    toggle.classList.add('sub-menu-toggle');
                    subMenu.parentNode.insertBefore(toggle, subMenu);
                }
            };
        /**
         * Measure the width of text given a font def and custom properties
         */
        /**
         * Measure the width of text given a font def and custom properties
         * @param {?} text
         * @param {?} font
         * @param {?=} overwrites
         * @return {?}
         */
        AlphaHeader.prototype.measureWidth = /**
         * Measure the width of text given a font def and custom properties
         * @param {?} text
         * @param {?} font
         * @param {?=} overwrites
         * @return {?}
         */
            function (text, font, overwrites) {
                if (overwrites === void 0) {
                    overwrites = {};
                }
                /** @type {?} */
                var letterSpacing = overwrites.letterSpacing || 0;
                /** @type {?} */
                var wordSpacing = overwrites.wordSpacing || 0;
                /** @type {?} */
                var addSpacing = addWordAndLetterSpacing(wordSpacing, letterSpacing);
                /** @type {?} */
                var ctx = this.getContext2d(font);
                return ctx.measureText(text).width + addSpacing(text);
            };
        /**
         * Get canvas element to measure text with
         */
        /**
         * Get canvas element to measure text with
         * @param {?} font
         * @return {?}
         */
        AlphaHeader.prototype.getContext2d = /**
         * Get canvas element to measure text with
         * @param {?} font
         * @return {?}
         */
            function (font) {
                if (this.canvasContext) {
                    return this.canvasContext;
                }
                try {
                    /** @type {?} */
                    var ctx = document.createElement('canvas').getContext('2d');
                    /** @type {?} */
                    var dpr = window.devicePixelRatio || 1;
                    /** @type {?} */
                    var bsr = ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio || 1;
                    ctx.font = font;
                    ctx.setTransform(dpr / bsr, 0, 0, dpr / bsr, 0, 0);
                    this.canvasContext = ctx;
                    return ctx;
                }
                catch (err) {
                    throw new Error('Canvas support required');
                }
            };
        /**
         * @return {?}
         */
        AlphaHeader.prototype.open = /**
         * @return {?}
         */
            function () {
                this.closeSubMenus();
                this.element.classList.add('open');
                htmlClasses.add('nav-open');
            };
        /**
         * @return {?}
         */
        AlphaHeader.prototype.close = /**
         * @return {?}
         */
            function () {
                this.element.classList.remove('open');
                htmlClasses.remove('nav-open');
            };
        /**
         * @return {?}
         */
        AlphaHeader.prototype.closeSubMenus = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var openElements = this.element.querySelectorAll('.open');
                /** @type {?} */
                var i = 0;
                /** @type {?} */
                var len = openElements.length;
                for (i; i < len; i++) {
                    /** @type {?} */
                    var item = openElements[i];
                    item.classList.remove('open');
                }
            };
        /**
         * @return {?}
         */
        AlphaHeader.prototype.openSearch = /**
         * @return {?}
         */
            function () {
                this.closeSubMenus();
                this.searchArea.classList.add('open');
            };
        /**
         * @return {?}
         */
        AlphaHeader.prototype.closeSearch = /**
         * @return {?}
         */
            function () {
                this.searchArea.classList.remove('open');
            };
        /**
         * Remove listeners
         */
        /**
         * Remove listeners
         * @return {?}
         */
        AlphaHeader.prototype.destroy = /**
         * Remove listeners
         * @return {?}
         */
            function () {
                window.removeEventListener('resize', this._boundResizeFunction);
                this.element.removeEventListener('click', this._boundClickFunction);
            };
        /**
         * Resize function
         */
        /**
         * Resize function
         * @return {?}
         */
        AlphaHeader.prototype.check = /**
         * Resize function
         * @return {?}
         */
            function () {
                // extract the supported values
                /** @type {?} */
                var reservedWidth = MENU_RESERVED_WIDTH;
                /** @type {?} */
                var minItemSize = ITEM_SIZE;
                /** @type {?} */
                var toolBarIconWidth = ITEM_SIZE;
                /** @type {?} */
                var fontSize = ITEM_FONT_SIZE + "px";
                // available width the menu has to expand to
                /** @type {?} */
                var availWidth = document.body.clientWidth - reservedWidth;
                // width needed by the menu
                /** @type {?} */
                var collapsedWidthNeeded = this.getCollapsedMenuWidth({
                    font: "600 " + fontSize + " Century Gothic",
                    letterSpacing: "0.05em",
                    itemPadding: ITEM_MIN_PADDING * 2,
                    minItemWidth: minItemSize
                });
                // width needed for toolbar icon view
                /** @type {?} */
                var minWidthNeeded = this.toolBar.children.length * toolBarIconWidth;
                // new state to change into
                /** @type {?} */
                var newState;
                /*console.info(
                    "available width: " + availWidth + "\n"
                    + "need for collapsed: " + collapsedWidthNeeded + "\n"
                    + "need for toolbar: " + minWidthNeeded
                );*/
                /**
                 * Check conditions for collapsing
                 */
                if (availWidth < minWidthNeeded) {
                    newState = 'minified';
                }
                else if (availWidth < collapsedWidthNeeded) {
                    newState = 'collapsed';
                }
                else {
                    newState = '';
                    // set any extra item padding available
                    this.setExtraItemPadding();
                }
                if (this.state !== newState) {
                    if (newState === 'minified' || newState === 'collapsed') {
                        htmlClasses.add('nav-collapsed');
                        this.element.classList.add('collapsed');
                    }
                    if (newState === '') {
                        htmlClasses.remove('nav-minified');
                        htmlClasses.remove('nav-collapsed');
                        this.element.classList.remove('minified');
                        this.element.classList.remove('collapsed');
                    }
                    else if (newState === 'minified') {
                        htmlClasses.add('nav-minified');
                        this.element.classList.add('minified');
                    }
                    else if (newState === 'collapsed' && this.state === 'minified') {
                        this.element.classList.remove('minified');
                        htmlClasses.remove('nav-minified');
                    }
                    else if (this.state === 'collapsed') {
                        this.element.classList.remove('collapsed');
                        htmlClasses.remove('nav-collapsed');
                    }
                    this.state = newState;
                }
            };
        /**
         * Set extra item padding
         */
        /**
         * Set extra item padding
         * @return {?}
         */
        AlphaHeader.prototype.setExtraItemPadding = /**
         * Set extra item padding
         * @return {?}
         */
            function () {
                // available width the menu has to expand to
                /** @type {?} */
                var availWidth = document.body.clientWidth - MENU_RESERVED_WIDTH;
                /** @type {?} */
                var childrenToPad = [];
                /** @type {?} */
                var i = 0;
                for (i; i < this.menuContainer.childElementCount; i++) {
                    /** @type {?} */
                    var el = ( /** @type {?} */(this.menuContainer.children[i]));
                    if (!el.hasAttribute('menu-icon') && !el.classList.contains('menu-icon-width')) {
                        childrenToPad.push(el);
                    }
                    else {
                        availWidth -= ITEM_SIZE;
                    }
                }
                // min width with no padding, excluding icons
                /** @type {?} */
                var minWidthNeeded = this.getCollapsedMenuWidth({
                    font: "600 " + ITEM_FONT_SIZE + "px" + " Century Gothic",
                    letterSpacing: "0.05em",
                    itemPadding: 0,
                    minItemWidth: 0,
                    excludeIcons: true
                });
                // space available to distribute to padding
                /** @type {?} */
                var paddingToDistribute = availWidth - minWidthNeeded;
                // item padding
                /** @type {?} */
                var extraItemPadding = paddingToDistribute / (childrenToPad.length * 2);
                // ensure max/min
                if (extraItemPadding > ITEM_MAX_PADDING) {
                    extraItemPadding = ITEM_MAX_PADDING;
                }
                else if (extraItemPadding < ITEM_MIN_PADDING) {
                    extraItemPadding = ITEM_MIN_PADDING;
                }
                /*console.info(
                    "minWidthNeeded: " + minWidthNeeded + "\n"
                    + "availWidth: " + availWidth + "\n"
                    + "will distribute: " + paddingToDistribute + "\n"
                    + "to " + childrenToPad.length + " each: " + extraItemPadding + "\n"
                );*/
                /**
                 * Set padding on the menu elements
                 */
                for (i = 0; i < childrenToPad.length; i++) {
                    /** @type {?} */
                    var el = ( /** @type {?} */(childrenToPad[i]));
                    if (!el.firstElementChild) {
                        continue;
                    }
                    /** @type {?} */
                    var link = ( /** @type {?} */(el.firstElementChild));
                    link.style.paddingLeft = extraItemPadding + "px";
                    link.style.paddingRight = extraItemPadding + "px";
                }
            };
        return AlphaHeader;
    }());
    /**
     *
     * 	Helper functions
     *
     */
    /**
     *
     * @param {?} obj
     * @param {?} defaultProps
     * @return {?}
     */
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
     * @param {?} src
     * @param {?} attr
     * @param {?} defaultValue
     * @return {?}
     */
    function prop(src, attr, defaultValue) {
        return (src && typeof src[attr] !== 'undefined' && src[attr]) || defaultValue;
    }
    /**
     * We only support rem/em/pt conversion
     * @param {?} val
     * @param {?=} options
     * @return {?}
     */
    function pxValue(val, options) {
        if (options === void 0) {
            options = {};
        }
        /** @type {?} */
        var baseFontSize = parseInt(prop(options, 'base-font-size', 16), 10);
        /** @type {?} */
        var value = parseFloat(val);
        /** @type {?} */
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
     * Add custom letter and word spacing
     * @param {?} ws
     * @param {?} ls
     * @return {?}
     */
    function addWordAndLetterSpacing(ws, ls) {
        /** @type {?} */
        var wordAddon = 0;
        if (ws) {
            wordAddon = pxValue(ws);
        }
        /** @type {?} */
        var letterAddon = 0;
        if (ls) {
            letterAddon = pxValue(ls);
        }
        return function (text) {
            /** @type {?} */
            var words = text.trim().replace(/\s+/gi, ' ').split(' ').length - 1;
            /** @type {?} */
            var chars = text.length;
            return (words * wordAddon) + (chars * letterAddon);
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var AlphaGlobalHeader = /** @class */ (function () {
        function AlphaGlobalHeader(elRef, router$$1) {
            var _this = this;
            this.elRef = elRef;
            this.router = router$$1;
            this.homeTarget = '_self';
            this.languages = [];
            /**
             * Listen to navigation events
             * Toolbar items that get moved around lose their ability to have their classes added / removed by angular
             */
            this.router.events.subscribe(function (event) {
                if (!_this.header) {
                    return;
                }
                if (event instanceof router.NavigationStart) {
                    // close any open nav
                    _this.header.close();
                }
            });
        }
        /**
         * Close menu when clicking on self link
         *
         * @param event
         */
        /**
         * Close menu when clicking on self link
         *
         * @param {?} event
         * @return {?}
         */
        AlphaGlobalHeader.prototype.onClick = /**
         * Close menu when clicking on self link
         *
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var targ = event.target;
                /** @type {?} */
                var isRouterLink = targ.hasAttribute('href');
                if (isRouterLink) {
                    // close the nav (should close by itself but when clicking on own items no navigation occurs)
                    this.header.close();
                }
            };
        /**
         * After view and content has been rendered, check the menu widths
         */
        /**
         * After view and content has been rendered, check the menu widths
         * @return {?}
         */
        AlphaGlobalHeader.prototype.ngAfterViewInit = /**
         * After view and content has been rendered, check the menu widths
         * @return {?}
         */
            function () {
                // use our common menu sizing lib
                this.header = new AlphaHeader(this.elRef.nativeElement, {
                    search: this.search ? { action: this.searchAction } : false,
                    languages: this.languages,
                    closeSubMenusOnClick: true
                });
            };
        /**
         * on click of the home link either use the router, or allow to open in new tab
         * @param event
         */
        /**
         * on click of the home link either use the router, or allow to open in new tab
         * @param {?} event
         * @return {?}
         */
        AlphaGlobalHeader.prototype.onHomeClick = /**
         * on click of the home link either use the router, or allow to open in new tab
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.home instanceof Array) {
                    event.preventDefault();
                    this.router.navigate(this.home);
                }
                else {
                    /** @type {?} */
                    var link = ( /** @type {?} */(event.target));
                    link.setAttribute('href', this.home);
                }
            };
        /**
         * Cleanup on destroy
         */
        /**
         * Cleanup on destroy
         * @return {?}
         */
        AlphaGlobalHeader.prototype.ngOnDestroy = /**
         * Cleanup on destroy
         * @return {?}
         */
            function () {
                this.header.destroy();
            };
        AlphaGlobalHeader.decorators = [
            { type: core.Component, args: [{
                        selector: 'alpha-global-header',
                        template: "\n\t<a *ngIf=\"home\" class=\"question-mark agh-icon-logo\" id=\"mobileLogo\" (click)=\"onHomeClick($event)\" [target]=\"homeTarget\"></a>\n\n\t<div class=\"menu-container\">\n\n\t\t<div *ngIf=\"home\" class=\"before-menu\">\n\t\t\t<a class=\"question-mark agh-icon-logo\" (click)=\"onHomeClick($event)\" [target]=\"homeTarget\"></a>\n\t\t</div>\n\n\t\t<div class=\"menu-area\">\n\n\t\t\t<ul menu-container class=\"main-menu\">\n\n\t\t\t\t<ng-content></ng-content>\n\n\t\t\t</ul>\n\n\t\t</div>\n\n\t</div>\n\n  \t",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["@font-face{font-family:AlphaIcons;font-weight:400;font-style:normal;src:url(data:application/font-woff;charset=utf-8;base64,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)}[class*=\" agh-icon-\"]::before,[class^=agh-icon-]::before,[data-agh-icon]::before{font-family:AlphaIcons!important;display:inline-block;font-style:normal;font-weight:400;font-variant:normal;text-transform:none!important;speak:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}[data-agh-icon]::before{content:attr(data-agh-icon)}.agh-icon-logo::before{content:\"\\64\"}.agh-icon-menu-toggle::before{content:\"\\65\"}.agh-icon-search::before{content:\"\\67\"}.agh-icon-check::before{content:\"\\76\"}.agh-icon-globe::before{content:\"\\77\"}.agh-icon-profile::before{content:\"\\78\"}.agh-icon-close-thin::before{content:\"\\79\"}html.nav-open{overflow:hidden}html.nav-open .menu-toolbar{display:none!important}html.nav-collapsed body{padding-top:84px}html.nav-collapsed alpha-global-header{box-sizing:initial;height:84px}html.nav-collapsed alpha-global-header .question-mark{width:84px;height:84px;max-width:84px;min-width:84px}html.nav-collapsed alpha-global-header [menu-icon]{max-width:84px}html.nav-collapsed alpha-global-header .menu-search-area,html.nav-collapsed alpha-global-header .menu-search-input{height:84px}html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children:hover>.sub-menu{top:85px}html.nav-collapsed alpha-global-header .menu-toolbar>.menu-item-has-children.open>.sub-menu{top:84px}html.nav-collapsed alpha-global-header .menu-toolbar>::after,html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>::after{height:84px}html.nav-collapsed alpha-global-header .menu-toolbar>.menu-icon-width,html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>.menu-icon-width{max-width:84px}html.nav-collapsed alpha-global-header .menu-search-area form .search-form-close{flex-basis:84px}html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>:not(template){min-width:84px}html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>:not(template)>a{height:84px}html:not([dir=rtl]) html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>:not(template):last-child .sub-menu{right:-1px;left:unset}html.nav-collapsed alpha-global-header.collapsed .menu-toolbar>:not(template){min-width:84px;height:84px}html.nav-minified body{padding-top:58px}html.nav-minified alpha-global-header{box-sizing:initial;height:58px}html.nav-minified alpha-global-header .question-mark{width:58px;height:58px;max-width:58px;min-width:58px}html.nav-minified alpha-global-header [menu-icon]{max-width:58px}html.nav-minified alpha-global-header .menu-search-area,html.nav-minified alpha-global-header .menu-search-input{height:58px}html.nav-minified alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children:hover>.sub-menu{top:59px}html.nav-minified alpha-global-header .menu-toolbar>.menu-item-has-children.open>.sub-menu{top:58px}html.nav-minified alpha-global-header .menu-toolbar>::after,html.nav-minified alpha-global-header:not(.collapsed) .main-menu>::after{height:58px}html.nav-minified alpha-global-header .menu-toolbar>.menu-icon-width,html.nav-minified alpha-global-header:not(.collapsed) .main-menu>.menu-icon-width{max-width:58px}html.nav-minified alpha-global-header .menu-search-area form .search-form-close{flex-basis:58px}html.nav-minified alpha-global-header:not(.collapsed) .main-menu>:not(template){min-width:58px}html.nav-minified alpha-global-header:not(.collapsed) .main-menu>:not(template)>a{height:58px}html:not([dir=rtl]) html.nav-minified alpha-global-header:not(.collapsed) .main-menu>:not(template):last-child .sub-menu{right:-1px;left:unset}html.nav-minified alpha-global-header.collapsed .menu-toolbar>:not(template){min-width:58px;height:58px}body{padding-top:84px}alpha-global-header{box-sizing:initial;height:84px;display:block;position:fixed;z-index:250000;top:0;left:0;width:100%;line-height:1;font-family:\"Avante Garde\",\"Century Gothic\",sans-serif;color:#000}alpha-global-header .menu-search-area,alpha-global-header .menu-search-input{height:84px}alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children:hover>.sub-menu{top:85px}alpha-global-header .menu-toolbar>.menu-item-has-children.open>.sub-menu{top:84px}alpha-global-header .menu-toolbar>.menu-icon-width,alpha-global-header:not(.collapsed) .main-menu>.menu-icon-width{max-width:84px}alpha-global-header .menu-search-area form .search-form-close{flex-basis:84px}html:not([dir=rtl]) alpha-global-header:not(.collapsed) .main-menu>:not(template):last-child .sub-menu{right:-1px;left:unset}alpha-global-header a{text-decoration:none;display:block;color:inherit;cursor:pointer}alpha-global-header li,alpha-global-header ul{padding:0;margin:0;list-style:none;position:relative}alpha-global-header #closeButton{display:none}alpha-global-header .question-mark{width:84px;height:84px;max-width:84px;min-width:84px;cursor:pointer;color:#e42312;font-size:45px;display:flex;align-items:center;justify-content:center;box-sizing:border-box}alpha-global-header li a{color:#000;transition:color .3s ease-out,background-color .3s ease-out}alpha-global-header [menu-icon]{max-width:84px;cursor:pointer;font-size:22px;transition:color .2s ease-out}alpha-global-header [menu-icon]:hover::before{color:#e42312}alpha-global-header [menu-icon]::before{font-family:AlphaIcons;content:attr(menu-icon);font-weight:400;position:relative;z-index:50;transition:color .2s ease-out}alpha-global-header .no-cursor{cursor:default}alpha-global-header .search-icon{font-size:26px}alpha-global-header .menu-toolbar .menu-item-has-children.open:not(.current-menu-item),alpha-global-header:not(.collapsed) .main-menu .menu-item-has-children:hover:not(.current-menu-item){border-bottom:1px solid #fff}alpha-global-header .menu-toolbar .menu-item-has-children.open>.sub-menu,alpha-global-header:not(.collapsed) .main-menu .menu-item-has-children:hover>.sub-menu{-webkit-transform:translateY(0);transform:translateY(0);height:auto;border:1px solid #dfdfdf;border-top:none}alpha-global-header .menu-toolbar>::before,alpha-global-header:not(.collapsed) .main-menu>::before{position:relative;z-index:50}alpha-global-header .menu-toolbar>::after,alpha-global-header:not(.collapsed) .main-menu>::after{height:84px;content:\"\";background:#fff;position:absolute;top:0;left:0;z-index:32;display:block;width:100%;border-left:1px solid #dfdfdf;border-right:1px solid #dfdfdf}alpha-global-header .menu-toolbar>* .sub-menu li:hover>a,alpha-global-header .menu-toolbar>:not(.menu-btn):hover>a,alpha-global-header:not(.collapsed) .main-menu>* .sub-menu li:hover>a,alpha-global-header:not(.collapsed) .main-menu>:not(.menu-btn):hover>a{color:#e42312}alpha-global-header .menu-toolbar>.current-menu-ancestor::after,alpha-global-header .menu-toolbar>.current-menu-item::after,alpha-global-header:not(.collapsed) .main-menu>.current-menu-ancestor::after,alpha-global-header:not(.collapsed) .main-menu>.current-menu-item::after{border-bottom:2px solid #e42312;top:-2px}alpha-global-header .menu-toolbar>.current-menu-ancestor .current-menu-item a,alpha-global-header .menu-toolbar>.current-menu-item .current-menu-item a,alpha-global-header:not(.collapsed) .main-menu>.current-menu-ancestor .current-menu-item a,alpha-global-header:not(.collapsed) .main-menu>.current-menu-item .current-menu-item a{color:#e42312}alpha-global-header .menu-toolbar>.menu-item-has-children .sub-menu,alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children .sub-menu{overflow:hidden;position:absolute;z-index:30;left:0;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;width:100%;height:0;padding:0;background:#fff;-webkit-transform:translateY(-100%);transform:translateY(-100%);transition:transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out}alpha-global-header .menu-toolbar>.menu-item-has-children .sub-menu a,alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children .sub-menu a{padding:18px 50px 16px;letter-spacing:0}alpha-global-header .menu-toolbar>.menu-item-has-children .sub-menu a:hover,alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children .sub-menu a:hover{background:#f9f9f9}alpha-global-header .main-menu{display:flex;flex-flow:row nowrap;margin:0;font-size:18px}alpha-global-header .main-menu>:not(template){font-weight:600;letter-spacing:.36px;position:relative}alpha-global-header .main-menu>:not(template)>a{position:relative;z-index:35;box-sizing:border-box;display:flex;align-items:center;flex-flow:row wrap}alpha-global-header .sub-menu{font-size:16px;font-weight:200}alpha-global-header .menu-toggle{background-color:#f9f9f9;border-left:1px solid #dfdfdf;z-index:50}html:not(.nav-minified) alpha-global-header .menu-toggle:hover i,html:not(.nav-minified) alpha-global-header .menu-toggle:hover::after,html:not(.nav-minified) alpha-global-header .menu-toggle:hover::before{background-color:#e42312}alpha-global-header .menu-toggle i,alpha-global-header .menu-toggle::after,alpha-global-header .menu-toggle::before{height:2px!important;margin:4px 0;display:block;background-color:#000;position:static;width:33%;transition:background-color .2s ease-out}alpha-global-header .menu-toggle::after,alpha-global-header .menu-toggle::before{content:\"\"}alpha-global-header .menu-search-area{position:absolute;z-index:300;left:100%;top:0;width:100%;background:#fff;-webkit-transform:translateX(0);transform:translateX(0);transition:transform .3s ease-out,-webkit-transform .3s ease-out}alpha-global-header .menu-search-area form{display:flex;flex-grow:1}alpha-global-header .menu-search-area.open{-webkit-transform:translateX(-100%);transform:translateX(-100%)}alpha-global-header .menu-search-area .search-form-close{cursor:pointer;background-color:#e42312;color:#fff;font-size:30px;display:flex;justify-content:center;align-items:center}alpha-global-header .menu-search-area .menu-search-input-wrapper{flex-grow:1}alpha-global-header .menu-search-area .menu-search-input{font-size:20px;color:#5d6368;border:none;border-left:1px solid #dfdfdf;background-color:#f9f9f9;width:100%;margin:0;padding:20px 50px;box-sizing:border-box}alpha-global-header .menu-search-area .menu-search-input:focus{outline:0}alpha-global-header:not(.collapsed) #mobileLogo,alpha-global-header:not(.collapsed) .menu-toolbar{display:none}alpha-global-header:not(.collapsed) .before-menu{border-bottom:1px solid #dfdfdf;flex-grow:1;min-width:84px;background:#fff}alpha-global-header:not(.collapsed) .menu-container{display:flex;justify-content:space-between}alpha-global-header:not(.collapsed) .menu-btn::after{background-color:#e42312;transition:background-color 150ms ease-in-out}alpha-global-header:not(.collapsed) .menu-btn:hover::after{background-color:#b51c0e}alpha-global-header:not(.collapsed) .menu-btn a{color:#fff;line-height:1.8}alpha-global-header:not(.collapsed) .menu-area{position:relative}alpha-global-header:not(.collapsed) .main-menu{justify-content:flex-end}alpha-global-header:not(.collapsed) .main-menu>:not(template){min-width:84px;border-bottom:1px solid #dfdfdf;display:flex;align-items:center;justify-content:center;flex:1 0 auto}alpha-global-header:not(.collapsed) .main-menu>:not(template).bg-darker::after{background-color:#f9f9f9}alpha-global-header:not(.collapsed) .main-menu>:not(template)>a{height:84px;width:100%;justify-content:center}alpha-global-header.collapsed{display:flex;justify-content:space-between;background:#fff;border-bottom:1px solid #dfdfdf}alpha-global-header.collapsed.open .main-menu{display:flex}alpha-global-header.collapsed.open #closeButton{display:block;position:absolute;right:0;z-index:100;font-size:26px;padding:15px;line-height:80%;cursor:pointer;color:#fff}alpha-global-header.collapsed .menu-toolbar{display:flex;flex-flow:row nowrap;flex-grow:1;justify-content:flex-end;position:relative}alpha-global-header.collapsed .menu-toolbar>:not(template){min-width:84px;height:84px;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center;position:relative}alpha-global-header.collapsed .menu-search-area .menu-search-input{border:none}alpha-global-header.collapsed .before-menu{display:none}alpha-global-header.collapsed .main-menu .sub-menu-toggle{cursor:pointer;display:inline-flex;justify-content:center;align-items:center;margin:0 0 0 -12px;vertical-align:middle;height:auto;padding:10px}alpha-global-header.collapsed .main-menu .sub-menu-toggle::before{content:\"\";position:absolute;border-bottom:none;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #fff}alpha-global-header.collapsed li{border:none;display:block}alpha-global-header.collapsed li a{background:0 0;height:auto;color:inherit}alpha-global-header.collapsed .menu-container li a{border:none}alpha-global-header.collapsed .main-menu{position:fixed;top:0;left:0;z-index:50;width:100%;height:100%;overflow-y:auto;display:none;flex-flow:column nowrap;justify-content:center;background:#000;color:#fff;text-align:center}alpha-global-header.collapsed .main-menu a{padding-top:8px;padding-bottom:8px;color:inherit}alpha-global-header.collapsed .main-menu [menu-icon]{max-width:none}alpha-global-header.collapsed .main-menu [menu-icon]:hover::before{color:inherit}alpha-global-header.collapsed .main-menu [menu-icon]::before{font-family:inherit;font-weight:inherit;content:attr(menu-title);display:inline-block}alpha-global-header.collapsed .main-menu [menu-icon]:not(a)::before{padding:8px 15px}alpha-global-header.collapsed .main-menu [menu-icon] .sub-menu-toggle{margin-left:-8px}alpha-global-header.collapsed .main-menu>:not(template){margin-bottom:10px;width:100%;flex:initial;font-size:24px}alpha-global-header.collapsed .main-menu>:not(template)>a{display:inline-block;font-size:inherit;flex-grow:0;height:auto}alpha-global-header.collapsed .main-menu>:not(template).open>.sub-menu{display:block}alpha-global-header.collapsed .main-menu>:not(template).open .sub-menu-toggle::before{border-top:none;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #fff}alpha-global-header.collapsed .main-menu .sub-menu{margin:20px 0;position:static;visibility:visible;display:none;background:0 0;border:none;width:100%;-webkit-transform:none;transform:none;font-size:18px}alpha-global-header.minified{border:none}alpha-global-header.minified .menu-toggle{background:0 0;border:none!important}alpha-global-header.minified .menu-toggle::after,alpha-global-header.minified .menu-toggle::before,alpha-global-header.minified .menu-toggle>i{margin:2px 0}alpha-global-header.minified .question-mark{font-size:30px}alpha-global-header.minified .menu-toolbar>:not(.menu-toggle){display:none}"]
                    }] }
        ];
        /** @nocollapse */
        AlphaGlobalHeader.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: router.Router }
            ];
        };
        AlphaGlobalHeader.propDecorators = {
            home: [{ type: core.Input, args: ['home',] }],
            homeTarget: [{ type: core.Input, args: ['homeTarget',] }],
            search: [{ type: core.Input, args: ['search',] }],
            searchAction: [{ type: core.Input, args: ['search-action',] }],
            languages: [{ type: core.Input, args: ['languages',] }],
            onClick: [{ type: core.HostListener, args: ['click', ['$event'],] }]
        };
        return AlphaGlobalHeader;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var AlphaGlobalHeaderModule = /** @class */ (function () {
        function AlphaGlobalHeaderModule() {
        }
        AlphaGlobalHeaderModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            AlphaGlobalHeader
                        ],
                        exports: [
                            AlphaGlobalHeader,
                        ],
                        imports: [
                            common.CommonModule,
                        ]
                    },] }
        ];
        return AlphaGlobalHeaderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.AlphaGlobalHeaderModule = AlphaGlobalHeaderModule;
    exports.ɵa = AlphaGlobalHeader;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxwaGEtZ2xvYmFsLWhlYWRlci51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FscGhhLWdsb2JhbC1oZWFkZXIvc3JjL3V0aWwvbWVudS1jb21wb25lbnQudHMiLCJuZzovL2FscGhhLWdsb2JhbC1oZWFkZXIvc3JjL2FscGhhLWdsb2JhbC1oZWFkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9hbHBoYS1nbG9iYWwtaGVhZGVyL3NyYy9tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIHJlZmVyZW5jZSB0byBkb2N1bWVudCBlbGVtZW50IGNsYXNzZXNcclxuY29uc3QgaHRtbENsYXNzZXMgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0O1xyXG5cclxuXHJcbmNvbnN0IElURU1fU0laRSA9IDg0O1xyXG5jb25zdCBJVEVNX01BWF9QQURESU5HID0gNTA7XHJcbmNvbnN0IElURU1fTUlOX1BBRERJTkcgPSAxNTtcclxuY29uc3QgSVRFTV9GT05UX1NJWkUgPSAxODtcclxuY29uc3QgTUVOVV9SRVNFUlZFRF9XSURUSCA9IDg0OyAvLyB0aGUgbG9nbyBpcyBvbmx5IHJlcXVpcmVkIHNwYWNlXHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIGluIHBvbHltZXIgYW5kIGFuZ3VsYXIgdG8gY29uc3RydWN0IGFuZCBtYW5hZ2UgdGhlIG1lbnVcclxuICovXHJcbmNsYXNzIEFscGhhSGVhZGVyIHtcclxuXHJcblx0cHVibGljIHRvb2xCYXI6IEhUTUxFbGVtZW50O1xyXG5cdHB1YmxpYyBtZW51Q29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHRwdWJsaWMgc2VhcmNoQXJlYTogSFRNTEVsZW1lbnQ7XHJcblxyXG5cdHB1YmxpYyBpc0NvbGxhcHNlZDogYm9vbGVhbjtcclxuXHRwdWJsaWMgaXNNaW5pZmllZDogYm9vbGVhbjtcclxuXHRwdWJsaWMgc3RhdGU6IHN0cmluZztcclxuXHRwdWJsaWMgb3B0aW9uczogYW55O1xyXG5cdHB1YmxpYyBkZWZhdWx0czogYW55ID0ge1xyXG5cdFx0bWluSXRlbVNpemU6IDEwLFxyXG5cdFx0Zm9udFNpemU6IFwiMTBweFwiLFxyXG5cdFx0cmVzZXJ2ZWRXaWR0aDogNTAsXHJcblx0XHRpdGVtUGFkZGluZzogMTAsIC8vICogeCAyLFxyXG5cdFx0dG9vbEJhckl0ZW1TZWxlY3RvcjogJ1t0b29sYmFyLWl0ZW1dJyxcclxuXHRcdGNsb3NlU3ViTWVudXNPbkNsaWNrOiBmYWxzZSxcclxuXHRcdGxhbmd1YWdlczogW11cclxuXHJcblx0fTtcclxuXHJcblx0cHJpdmF0ZSBjYW52YXNDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG5cdHByaXZhdGUgX2JvdW5kUmVzaXplRnVuY3Rpb246IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q7XHJcblx0cHJpdmF0ZSBfYm91bmRDbGlja0Z1bmN0aW9uOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0O1xyXG5cdHByaXZhdGUgX2JvdW5kV2luZG93Q2xpY2tGdW5jdGlvbjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdDtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZWxlbWVudCxcclxuXHRcdG9wdGlvbnNcclxuXHQpIHtcclxuXHJcblx0XHR0aGlzLmlzQ29sbGFwc2VkID0gZmFsc2U7XHJcblx0XHR0aGlzLmlzTWluaWZpZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuc3RhdGUgPSAnJztcclxuXHRcdHRoaXMubWVudUNvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCAnW21lbnUtY29udGFpbmVyXScgKTtcclxuXHJcblx0XHR0aGlzLm9wdGlvbnMgPSBtZXJnZSggb3B0aW9ucyB8fCB7fSwgdGhpcy5kZWZhdWx0cyApO1xyXG5cclxuXHRcdHRoaXMuYXR0YWNoVG9vbGJhckVsZW1lbnRzKCk7XHJcblxyXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMubGFuZ3VhZ2VzLmxlbmd0aCApIHtcclxuXHRcdFx0dGhpcy5tZW51Q29udGFpbmVyLmFwcGVuZENoaWxkKCB0aGlzLmNyZWF0ZUxhbmd1YWdlTWVudSggJ25vLWN1cnNvcicgKSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNyZWF0ZSBzdWIgbWVudSB0b2dnbGVzXHJcblx0XHR0aGlzLmF0dGFjaFN1Yk1lbnVUb2dnbGVzKCk7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIHRvb2xiYXIgbWVudSBhZnRlciBzdWItbWVudSB0b2dnbGVcclxuXHRcdGlmICggdGhpcy5vcHRpb25zLmxhbmd1YWdlcy5sZW5ndGggKSB7XHJcblx0XHRcdHRoaXMudG9vbEJhci5pbnNlcnRCZWZvcmUoIHRoaXMuY3JlYXRlTGFuZ3VhZ2VNZW51KCAnc3ViLW1lbnUtdG9nZ2xlJyApLCB0aGlzLnRvb2xCYXIuZmlyc3RDaGlsZCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5vcHRpb25zLnNlYXJjaCApIHtcclxuXHRcdFx0dGhpcy5jcmVhdGVTZWFyY2hBcmVhKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XHJcblx0XHRcdHRoaXMuY2hlY2soKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoICdyZWFkeScgKTtcclxuXHRcdH0gKTtcclxuXHJcblx0XHR0aGlzLl9ib3VuZFJlc2l6ZUZ1bmN0aW9uID0gdGhpcy5jaGVjay5iaW5kKCB0aGlzICk7XHJcblx0XHR0aGlzLl9ib3VuZENsaWNrRnVuY3Rpb24gPSB0aGlzLm9uQ2xpY2suYmluZCggdGhpcyApO1xyXG5cdFx0dGhpcy5fYm91bmRXaW5kb3dDbGlja0Z1bmN0aW9uID0gdGhpcy5vbldpbmRvd0NsaWNrLmJpbmQoIHRoaXMgKTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMuX2JvdW5kUmVzaXplRnVuY3Rpb24gKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5fYm91bmRDbGlja0Z1bmN0aW9uICk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMuX2JvdW5kV2luZG93Q2xpY2tGdW5jdGlvbiApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpc3RlbiB0byBjbGlja3Mgb24gdGhlIHdpbmRvdyB0byBjbG9zZSBvcGVuIG5hdiBtZW51c1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25XaW5kb3dDbGljayggZXZlbnQgKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gaWYgdGhlIGNsaWNrIGNhbWUgZnJvbSB0aGUgbWVudSwgZG9udCBkbyBhbnl0aGluZ1xyXG5cdFx0aWYgKCBldmVudC5pc01lbnVDbGljayApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2xvc2VTdWJNZW51cygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlIGNsaWNrcyBvbiBkaWZmZXJlbnQgZWxlbWVudHNcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uQ2xpY2soIGV2ZW50ICk6IHZvaWQge1xyXG5cclxuXHRcdGV2ZW50LmlzTWVudUNsaWNrID0gdHJ1ZTtcclxuXHJcblxyXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMuY2xvc2VTdWJNZW51c09uQ2xpY2sgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoICduYXYtb3BlbicgKSApIHtcclxuXHRcdFx0Ly8gY2xvc2Ugc3ViLW1lbnVzIGlmIHRoZSBjbGljayBjYW1lIGZyb20gdGhlcmVcclxuXHRcdFx0bGV0IG1lbnVDb250YWluZXIgPSBldmVudC5jb21wb3NlZFBhdGgoKS5maWx0ZXIoIGZ1bmN0aW9uICggZWwgKSB7IHJldHVybiBlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCAnc3ViLW1lbnUnICk7IH0gKVxyXG5cdFx0XHRpZiAoIG1lbnVDb250YWluZXIubGVuZ3RoICkge1xyXG5cdFx0XHRcdGNvbnN0IHBhcmVudEVsOiBIVE1MRWxlbWVudCA9IG1lbnVDb250YWluZXJbIDAgXS5wYXJlbnRFbGVtZW50O1xyXG5cdFx0XHRcdGlmICggcGFyZW50RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCAnb3BlbicgKSApIHtcclxuXHRcdFx0XHRcdHBhcmVudEVsLmNsYXNzTGlzdC5yZW1vdmUoICdvcGVuJyApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnNwb29mQ2xvc2VTdWJNZW51KCBwYXJlbnRFbCApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdWIgbWVudSB0b2dnbGUgY2xpY2tzXHJcblx0XHQgKi9cclxuXHRcdGlmICggZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyggJ3N1Yi1tZW51LXRvZ2dsZScgKSApIHtcclxuXHJcblx0XHRcdGxldCBtZW51dGFyZ2V0O1xyXG5cdFx0XHRpZiAoIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdtZW51LWl0ZW0taGFzLWNoaWxkcmVuJyApICkge1xyXG5cclxuXHRcdFx0XHRtZW51dGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRtZW51dGFyZ2V0ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBpc09wZW46IGJvb2xlYW4gPSBtZW51dGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyggJ29wZW4nICk7XHJcblxyXG5cdFx0XHR0aGlzLmNsb3NlU3ViTWVudXMoKTtcclxuXHJcblx0XHRcdGlmICggaXNPcGVuICkge1xyXG5cdFx0XHRcdG1lbnV0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSggJ29wZW4nICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bWVudXRhcmdldC5jbGFzc0xpc3QuYWRkKCAnb3BlbicgKTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblxyXG5cdFx0fSBlbHNlIGlmICggZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyggJ3NlYXJjaC1mb3JtLWNsb3NlJyApICkge1xyXG5cclxuXHRcdFx0dGhpcy5jbG9zZVNlYXJjaCgpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdzZWFyY2gtaWNvbicgKSApIHtcclxuXHJcblx0XHRcdHRoaXMub3BlblNlYXJjaCgpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdtZW51LXRvZ2dsZScgKSApIHtcclxuXHJcblx0XHRcdHRoaXMub3BlbigpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LnRhcmdldC5pZCA9PT0gJ2Nsb3NlQnV0dG9uJyApIHtcclxuXHJcblx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluIGFuZ3VsYXIgc2l0dWF0aW9ucywgdGhlIHBhZ2UgZG9lc24ndCBuYXZpZ2F0ZSwgc28gYSBob3ZlcmVkIHN1Yi1tZW51IHdpbGwgcmVtYWluIG9wZW4gYWZ0ZXIgYSBjbGlja1xyXG5cdCAqIFRoaXMgd2lsbFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc3Bvb2ZDbG9zZVN1Yk1lbnUoIGVsZW1lbnQgKSB7XHJcblx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IElURU1fU0laRSArICdweCc7XHJcblx0XHRlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcblx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9ICcnO1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnJztcclxuXHJcblxyXG5cdFx0fSwgMTAwIClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdvIHRocm91Z2ggZWFjaCBkaXJlY3QgY2hpbGRyZW4gb2YgdGhlIHVsIG1lbnUgY29udGFpbmVyLCBtZWFzdXJlIHRoZSByZXF1aXJlZCB0ZXh0IGZvciBlYWNoIGVsZW1lbnQgcGx1cyBzb21lIHBhZGRpbmdcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldENvbGxhcHNlZE1lbnVXaWR0aCggb3B0aW9ucyApOiBudW1iZXIge1xyXG5cclxuXHRcdHZhciBtaW5XaWR0aCA9IDAsXHJcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LFxyXG5cdFx0XHRmb250ID0gb3B0aW9ucy5mb250IHx8IFwiMTBweCBBcmlhbFwiLFxyXG5cdFx0XHRsZXR0ZXJTcGFjaW5nID0gb3B0aW9ucy5sZXR0ZXJTcGFjaW5nIHx8IDAsXHJcblx0XHRcdGl0ZW1QYWRkaW5nID0gb3B0aW9ucy5pdGVtUGFkZGluZyB8fCAwLFxyXG5cdFx0XHRtaW5JdGVtV2lkdGggPSBvcHRpb25zLm1pbkl0ZW1XaWR0aCB8fCAwLFxyXG5cdFx0XHR3b3JkU3BhY2luZyA9IG9wdGlvbnMud29yZFNwYWNpbmcgfHwgMCxcclxuXHRcdFx0ZXhjbHVkZUljb25zID0gb3B0aW9ucy5leGNsdWRlSWNvbnMgfHwgZmFsc2UsXHJcblx0XHRcdGkgPSAwO1xyXG5cclxuXHRcdGZvciAoIGk7IGkgPCB0aGlzLm1lbnVDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKysgKSB7XHJcblxyXG5cdFx0XHR2YXIgbGlFbCA9IHRoaXMubWVudUNvbnRhaW5lci5jaGlsZHJlblsgaSBdO1xyXG5cclxuXHRcdFx0dmFyIGxpbmsgPSBsaUVsLmZpcnN0RWxlbWVudENoaWxkIHx8IGxpRWwsXHJcblx0XHRcdFx0dGV4dCA9IGxpbmsudGV4dENvbnRlbnQsXHJcblx0XHRcdFx0bmVlZGVkO1xyXG5cclxuXHRcdFx0aWYgKCB0ZXh0ICkge1xyXG5cdFx0XHRcdG5lZWRlZCA9IHRoaXMubWVhc3VyZVdpZHRoKCB0ZXh0LCBmb250LCB7IGxldHRlclNwYWNpbmc6IGxldHRlclNwYWNpbmcsIHdvcmRTcGFjaW5nOiB3b3JkU3BhY2luZyB9ICkgKyBpdGVtUGFkZGluZztcclxuXHRcdFx0fSBlbHNlIGlmICggIWV4Y2x1ZGVJY29ucyApIHtcclxuXHRcdFx0XHRuZWVkZWQgPSBtaW5JdGVtV2lkdGg7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vY29uc29sZS5pbmZvKGxpbmsudGV4dENvbnRlbnQsIG5lZWRlZCk7XHJcblxyXG5cdFx0XHQvLyBlbnN1cmUgbWluIGl0ZW0gd2lkdGhcclxuXHRcdFx0bWluV2lkdGggKz0gbmVlZGVkIDwgbWluSXRlbVdpZHRoID8gbWluSXRlbVdpZHRoIDogbmVlZGVkO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG1pbldpZHRoO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZSB0b29sYmFyIGVsZW1lbnRzIGludG8gdGhlIHRvb2xiYXIgZnJvbSB0aGUgbWVudVxyXG5cdCAqXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhdHRhY2hUb29sYmFyRWxlbWVudHMoKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIHRoZSB0b29sYmFyIGNvbnRhaW5lclxyXG5cdFx0dGhpcy50b29sQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcclxuXHRcdHRoaXMudG9vbEJhci5jbGFzc0xpc3QuYWRkKCAnbWVudS10b29sYmFyJyApO1xyXG5cclxuXHRcdC8vIGFkZCBhIHNlYXJjaCBpY29uXHJcblx0XHRpZiAoIHRoaXMub3B0aW9ucy5zZWFyY2ggKSB7XHJcblx0XHRcdGNvbnN0IHNlYXJjaEljb246IEhUTUxFbGVtZW50ID0gdGhpcy5jcmVhdGVTZWFyY2hJY29uKCk7XHJcblx0XHRcdHRoaXMudG9vbEJhci5hcHBlbmRDaGlsZCggc2VhcmNoSWNvbiApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFkZCB0aGUgbWVudSBpY29uXHJcblx0XHRjb25zdCBtZW51VG9nZ2xlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdhJyApO1xyXG5cdFx0bWVudVRvZ2dsZS5jbGFzc0xpc3QuYWRkKCAnbWVudS10b2dnbGUnICk7XHJcblx0XHRtZW51VG9nZ2xlLmlubmVySFRNTCA9ICc8aT48L2k+JztcclxuXHRcdHRoaXMudG9vbEJhci5hcHBlbmRDaGlsZCggbWVudVRvZ2dsZSApO1xyXG5cclxuXHRcdC8vIGFkZCB0aGUgY2xvc2UgYnV0dG9uXHJcblx0XHRjb25zdCBjbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3BhbicgKTtcclxuXHRcdGNsb3NlQnV0dG9uLmlkID0gJ2Nsb3NlQnV0dG9uJztcclxuXHRcdGNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoICdhZ2gtaWNvbi1jbG9zZS10aGluJyApO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCBjbG9zZUJ1dHRvbiApO1xyXG5cclxuXHRcdC8vIGFwcGVuZCB0aGUgdG9vbGJhclxyXG5cdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLnRvb2xCYXIgKTtcclxuXHJcblx0XHQvLyBmaW5kIGR5bmFtaWMgdG9vbGJhciBpdGVtcyBmcm9tIHRoZSB1c2VyIG1hcmt1cFxyXG5cdFx0Y29uc3QgaXRlbXM6IE5vZGVMaXN0ID0gdGhpcy5tZW51Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoIHRoaXMub3B0aW9ucy50b29sQmFySXRlbVNlbGVjdG9yICk7XHJcblxyXG5cdFx0bGV0IGk6IG51bWJlciA9IDAsXHJcblx0XHRcdGxlbjogbnVtYmVyID0gaXRlbXMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAoIGk7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdFx0Y29uc3QgaXRlbTogTm9kZSA9IGl0ZW1zWyBpIF07XHJcblx0XHRcdHRoaXMudG9vbEJhci5pbnNlcnRCZWZvcmUoIGl0ZW0sIHRoaXMudG9vbEJhci5maXJzdENoaWxkICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSB0aGUgbGFuZ3VhZ2UgbWVudVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY3JlYXRlTGFuZ3VhZ2VNZW51KCBleHRyYUNsYXNzOiBzdHJpbmcgPSAnJyApOiBIVE1MRWxlbWVudCB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMubGFuZ3VhZ2VzLmxlbmd0aCA9PT0gMCApIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgbGFuZ3VhZ2VFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XHJcblx0XHRsYW5ndWFnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ21lbnUtaXRlbS1oYXMtY2hpbGRyZW4nICk7XHJcblx0XHRsYW5ndWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCAnbWVudS1pY29uJywgJ3cnICk7XHJcblx0XHRsYW5ndWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCAnbWVudS10aXRsZScsICdMYW5ndWFnZXMnICk7XHJcblxyXG5cdFx0aWYgKCBleHRyYUNsYXNzICkge1xyXG5cdFx0XHRsYW5ndWFnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCggZXh0cmFDbGFzcyApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBzdWJNZW51OiBzdHJpbmcgPSAnPHVsIGNsYXNzPVwic3ViLW1lbnVcIj4nLFxyXG5cdFx0XHRpOiBudW1iZXIgPSAwLFxyXG5cdFx0XHRsZW46IG51bWJlciA9IHRoaXMub3B0aW9ucy5sYW5ndWFnZXMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAoIGk7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdFx0Y29uc3QgbGFuZ3VhZ2UgPSB0aGlzLm9wdGlvbnMubGFuZ3VhZ2VzWyBpIF07XHJcblx0XHRcdGxldCBocmVmOiBzdHJpbmcgPSAnamF2YXNjcmlwdDp2b2lkKDApJztcclxuXHRcdFx0bGV0IGF0dHI6IHN0cmluZyA9ICcnO1xyXG5cdFx0XHRpZiAoIGxhbmd1YWdlLmNvZGUgKSB7XHJcblx0XHRcdFx0YXR0ciA9ICdkYXRhLWxhbmc9XCInICsgbGFuZ3VhZ2UuY29kZSArICdcIic7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCBsYW5ndWFnZS5ocmVmICkge1xyXG5cdFx0XHRcdGhyZWYgPSBsYW5ndWFnZS5ocmVmO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdWJNZW51ICs9ICc8bGk+PGEgJyArIGF0dHIgKyAnIGhyZWY9XCInICsgaHJlZiArICdcIj4nICsgbGFuZ3VhZ2UubGFiZWwgKyAnPC9hPjwvbGk+JztcclxuXHRcdH1cclxuXHJcblx0XHRzdWJNZW51ICs9ICc8L3VsPic7XHJcblxyXG5cdFx0bGFuZ3VhZ2VFbGVtZW50LmlubmVySFRNTCA9IHN1Yk1lbnU7XHJcblxyXG5cdFx0bGFuZ3VhZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsICggZXZlbnQ6IE1vdXNlRXZlbnQgKSA9PiB7XHJcblxyXG5cdFx0XHRsZXQgY29kZSA9IG51bGw7XHJcblx0XHRcdGlmICggbnVsbCAhPT0gKCBjb2RlID0gKCBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQgKS5nZXRBdHRyaWJ1dGUoICdkYXRhLWxhbmcnICkgKSApIHtcclxuXHRcdFx0XHRsZXQgdXJsOiBVUkwgPSBuZXcgVVJMKCBkb2N1bWVudC5sb2NhdGlvbi5ocmVmICk7XHJcblx0XHRcdFx0dXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoICdsYW5nJyApO1xyXG5cdFx0XHRcdHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCAnbGFuZycsIGNvZGUgKTtcclxuXHRcdFx0XHRkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsLmhyZWY7XHJcblx0XHRcdH1cclxuXHRcdH0gKTtcclxuXHJcblx0XHRyZXR1cm4gbGFuZ3VhZ2VFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIGFuIGljb24gdG8gb3BlbiB0aGUgc2VhcmNoXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjcmVhdGVTZWFyY2hJY29uKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdGNvbnN0IHNlYXJjaEljb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcclxuXHRcdHNlYXJjaEljb24uY2xhc3NMaXN0LmFkZCggJ3NlYXJjaC1pY29uJyApO1xyXG5cdFx0c2VhcmNoSWNvbi5zZXRBdHRyaWJ1dGUoICdtZW51LWljb24nLCAnZycgKTtcclxuXHRcdHJldHVybiBzZWFyY2hJY29uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIHRoZSBzZWFyY2ggYXJlYVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY3JlYXRlU2VhcmNoQXJlYSgpOiB2b2lkIHtcclxuXHJcblx0XHQvLyBjcmVhdGUgdGhlIHNlYXJjaCBmb3JtXHJcblx0XHR0aGlzLnNlYXJjaEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xyXG5cdFx0dGhpcy5zZWFyY2hBcmVhLmNsYXNzTGlzdC5hZGQoICdtZW51LXNlYXJjaC1hcmVhJyApO1xyXG5cclxuXHRcdC8vIGZvcm0gYWN0aW9uXHJcblx0XHRjb25zdCBzZWFyY2hBY3Rpb246IHN0cmluZyA9IHRoaXMub3B0aW9ucy5zZWFyY2guYWN0aW9uIHx8IFwiXCI7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIGEgVVJMIGZyb20gdGhlIHNlYXJjaCBhY3Rpb25cclxuXHRcdGNvbnN0IHNlYXJjaFVybDogVVJMID0gbmV3IFVSTCggc2VhcmNoQWN0aW9uLCBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gKTtcclxuXHJcblx0XHQvLyBnZXQgdGhlIGZvcm0gdGFyZ2V0XHJcblx0XHRjb25zdCBmb3JtVGFyZ2V0OiBzdHJpbmcgPSBzZWFyY2hVcmwuaG9zdG5hbWUgIT09IGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID8gJ19ibGFuaycgOiAnX3NlbGYnO1xyXG5cclxuXHRcdC8vIHRoZSBmb3JtIG1hcmt1cFxyXG5cdFx0dGhpcy5zZWFyY2hBcmVhLmlubmVySFRNTCA9XHJcblx0XHRcdGA8Zm9ybSB0YXJnZXQ9XCIkeyBmb3JtVGFyZ2V0IH1cIiBjbGFzcz1cIm1lbnUtc2VhcmNoXCIgYWN0aW9uPVwiJHsgc2VhcmNoQWN0aW9uIH1cIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWVudS1zZWFyY2gtaW5wdXQtd3JhcHBlclwiPlxyXG5cdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwibWVudS1zZWFyY2gtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJzXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtZm9ybS1jbG9zZSBhZ2gtaWNvbi1jbG9zZS10aGluXCI+PC9kaXY+XHJcblx0XHRcdDwvZm9ybT5gO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSB0aGUgdG9nZ2xlXHJcblx0XHRjb25zdCBzZWFyY2hJY29uOiBIVE1MRWxlbWVudCA9IHRoaXMuY3JlYXRlU2VhcmNoSWNvbigpO1xyXG5cclxuXHRcdC8vIGF0dGFjaCB0aGVtXHJcblx0XHR0aGlzLm1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQoIHNlYXJjaEljb24gKTtcclxuXHRcdHRoaXMubWVudUNvbnRhaW5lci5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLnNlYXJjaEFyZWEgKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEF0dGFjaCBzdWIgbWVudSB0b2dnbGVzXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhdHRhY2hTdWJNZW51VG9nZ2xlcygpOiB2b2lkIHtcclxuXHJcblx0XHRjb25zdCBzdWJNZW51cyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLnN1Yi1tZW51JyApO1xyXG5cclxuXHRcdGxldCBpOiBudW1iZXIgPSAwLFxyXG5cdFx0XHRsZW46IG51bWJlciA9IHN1Yk1lbnVzLmxlbmd0aDtcclxuXHJcblx0XHRmb3IgKCBpOyBpIDwgbGVuOyBpKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgc3ViTWVudSA9IHN1Yk1lbnVzWyBpIF07XHJcblxyXG5cdFx0XHRjb25zdCB0b2dnbGU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XHJcblx0XHRcdHRvZ2dsZS5jbGFzc0xpc3QuYWRkKCAnc3ViLW1lbnUtdG9nZ2xlJyApO1xyXG5cclxuXHRcdFx0c3ViTWVudS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggdG9nZ2xlLCBzdWJNZW51ICk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIE1lYXN1cmUgdGhlIHdpZHRoIG9mIHRleHQgZ2l2ZW4gYSBmb250IGRlZiBhbmQgY3VzdG9tIHByb3BlcnRpZXNcclxuXHQgKi9cclxuXHRwcml2YXRlIG1lYXN1cmVXaWR0aCggdGV4dCwgZm9udCwgb3ZlcndyaXRlczogYW55ID0ge30gKTogbnVtYmVyIHtcclxuXHJcblx0XHR2YXIgbGV0dGVyU3BhY2luZyA9IG92ZXJ3cml0ZXMubGV0dGVyU3BhY2luZyB8fCAwO1xyXG5cdFx0dmFyIHdvcmRTcGFjaW5nID0gb3ZlcndyaXRlcy53b3JkU3BhY2luZyB8fCAwO1xyXG5cdFx0dmFyIGFkZFNwYWNpbmcgPSBhZGRXb3JkQW5kTGV0dGVyU3BhY2luZyggd29yZFNwYWNpbmcsIGxldHRlclNwYWNpbmcgKTtcclxuXHJcblx0XHR2YXIgY3R4ID0gdGhpcy5nZXRDb250ZXh0MmQoIGZvbnQgKTtcclxuXHJcblx0XHRyZXR1cm4gY3R4Lm1lYXN1cmVUZXh0KCB0ZXh0ICkud2lkdGggKyBhZGRTcGFjaW5nKCB0ZXh0ICk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgY2FudmFzIGVsZW1lbnQgdG8gbWVhc3VyZSB0ZXh0IHdpdGhcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldENvbnRleHQyZCggZm9udCApOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xyXG5cclxuXHRcdGlmICggdGhpcy5jYW52YXNDb250ZXh0ICkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jYW52YXNDb250ZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBjdHg6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICkuZ2V0Q29udGV4dCggJzJkJyApO1xyXG5cdFx0XHR2YXIgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHRcdFx0dmFyIGJzciA9IGN0eC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XHJcblx0XHRcdFx0Y3R4Lm1vekJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcclxuXHRcdFx0XHRjdHgubXNCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XHJcblx0XHRcdFx0Y3R4Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XHJcblx0XHRcdFx0Y3R4LmJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHwgMTtcclxuXHRcdFx0Y3R4LmZvbnQgPSBmb250O1xyXG5cdFx0XHRjdHguc2V0VHJhbnNmb3JtKCBkcHIgLyBic3IsIDAsIDAsIGRwciAvIGJzciwgMCwgMCApO1xyXG5cclxuXHRcdFx0dGhpcy5jYW52YXNDb250ZXh0ID0gY3R4O1xyXG5cclxuXHRcdFx0cmV0dXJuIGN0eDtcclxuXHRcdH0gY2F0Y2ggKCBlcnIgKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvciggJ0NhbnZhcyBzdXBwb3J0IHJlcXVpcmVkJyApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBvcGVuKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jbG9zZVN1Yk1lbnVzKCk7XHJcblx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ29wZW4nICk7XHJcblx0XHRodG1sQ2xhc3Nlcy5hZGQoICduYXYtb3BlbicgKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnb3BlbicgKTtcclxuXHRcdGh0bWxDbGFzc2VzLnJlbW92ZSggJ25hdi1vcGVuJyApO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGNsb3NlU3ViTWVudXMoKTogdm9pZCB7XHJcblx0XHRsZXQgb3BlbkVsZW1lbnRzID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcub3BlbicgKTtcclxuXHRcdHZhciBpID0gMCwgbGVuID0gb3BlbkVsZW1lbnRzLmxlbmd0aDtcclxuXHRcdGZvciAoIGk7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBvcGVuRWxlbWVudHNbIGkgXTtcclxuXHRcdFx0aXRlbS5jbGFzc0xpc3QucmVtb3ZlKCAnb3BlbicgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvcGVuU2VhcmNoKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jbG9zZVN1Yk1lbnVzKCk7XHJcblx0XHR0aGlzLnNlYXJjaEFyZWEuY2xhc3NMaXN0LmFkZCggJ29wZW4nICk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2xvc2VTZWFyY2goKTogdm9pZCB7XHJcblxyXG5cdFx0dGhpcy5zZWFyY2hBcmVhLmNsYXNzTGlzdC5yZW1vdmUoICdvcGVuJyApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBsaXN0ZW5lcnNcclxuXHQgKi9cclxuXHRwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuXHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMuX2JvdW5kUmVzaXplRnVuY3Rpb24gKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5fYm91bmRDbGlja0Z1bmN0aW9uICk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNpemUgZnVuY3Rpb25cclxuXHQgKi9cclxuXHRwdWJsaWMgY2hlY2soKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gZXh0cmFjdCB0aGUgc3VwcG9ydGVkIHZhbHVlc1xyXG5cdFx0dmFyIHJlc2VydmVkV2lkdGggPSBNRU5VX1JFU0VSVkVEX1dJRFRILFxyXG5cdFx0XHRtaW5JdGVtU2l6ZSA9IElURU1fU0laRSxcclxuXHRcdFx0dG9vbEJhckljb25XaWR0aCA9IElURU1fU0laRSxcclxuXHRcdFx0Zm9udFNpemUgPSBJVEVNX0ZPTlRfU0laRSArIFwicHhcIlxyXG5cclxuXHRcdC8vIGF2YWlsYWJsZSB3aWR0aCB0aGUgbWVudSBoYXMgdG8gZXhwYW5kIHRvXHJcblx0XHR2YXIgYXZhaWxXaWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLSByZXNlcnZlZFdpZHRoO1xyXG5cclxuXHJcblx0XHQvLyB3aWR0aCBuZWVkZWQgYnkgdGhlIG1lbnVcclxuXHRcdHZhciBjb2xsYXBzZWRXaWR0aE5lZWRlZCA9IHRoaXMuZ2V0Q29sbGFwc2VkTWVudVdpZHRoKCB7XHJcblx0XHRcdGZvbnQ6IFwiNjAwIFwiICsgZm9udFNpemUgKyBcIiBDZW50dXJ5IEdvdGhpY1wiLFxyXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIjAuMDVlbVwiLFxyXG5cdFx0XHRpdGVtUGFkZGluZzogSVRFTV9NSU5fUEFERElORyAqIDIsXHJcblx0XHRcdG1pbkl0ZW1XaWR0aDogbWluSXRlbVNpemVcclxuXHRcdH0gKTtcclxuXHJcblx0XHQvLyB3aWR0aCBuZWVkZWQgZm9yIHRvb2xiYXIgaWNvbiB2aWV3XHJcblx0XHR2YXIgbWluV2lkdGhOZWVkZWQgPSB0aGlzLnRvb2xCYXIuY2hpbGRyZW4ubGVuZ3RoICogdG9vbEJhckljb25XaWR0aDtcclxuXHJcblx0XHQvLyBuZXcgc3RhdGUgdG8gY2hhbmdlIGludG9cclxuXHRcdHZhciBuZXdTdGF0ZTtcclxuXHJcblx0XHQvKmNvbnNvbGUuaW5mbyhcclxuXHRcdFx0XCJhdmFpbGFibGUgd2lkdGg6IFwiICsgYXZhaWxXaWR0aCArIFwiXFxuXCJcclxuXHRcdFx0KyBcIm5lZWQgZm9yIGNvbGxhcHNlZDogXCIgKyBjb2xsYXBzZWRXaWR0aE5lZWRlZCArIFwiXFxuXCJcclxuXHRcdFx0KyBcIm5lZWQgZm9yIHRvb2xiYXI6IFwiICsgbWluV2lkdGhOZWVkZWRcclxuXHRcdCk7Ki9cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrIGNvbmRpdGlvbnMgZm9yIGNvbGxhcHNpbmdcclxuXHRcdCAqL1xyXG5cclxuXHRcdGlmICggYXZhaWxXaWR0aCA8IG1pbldpZHRoTmVlZGVkICkge1xyXG5cclxuXHRcdFx0bmV3U3RhdGUgPSAnbWluaWZpZWQnO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGF2YWlsV2lkdGggPCBjb2xsYXBzZWRXaWR0aE5lZWRlZCApIHtcclxuXHJcblx0XHRcdG5ld1N0YXRlID0gJ2NvbGxhcHNlZCc7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdG5ld1N0YXRlID0gJyc7XHJcblx0XHRcdC8vIHNldCBhbnkgZXh0cmEgaXRlbSBwYWRkaW5nIGF2YWlsYWJsZVxyXG5cdFx0XHR0aGlzLnNldEV4dHJhSXRlbVBhZGRpbmcoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aGlzLnN0YXRlICE9PSBuZXdTdGF0ZSApIHtcclxuXHJcblx0XHRcdGlmICggbmV3U3RhdGUgPT09ICdtaW5pZmllZCcgfHwgbmV3U3RhdGUgPT09ICdjb2xsYXBzZWQnICkge1xyXG5cclxuXHRcdFx0XHRodG1sQ2xhc3Nlcy5hZGQoICduYXYtY29sbGFwc2VkJyApO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnY29sbGFwc2VkJyApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBuZXdTdGF0ZSA9PT0gJycgKSB7XHJcblxyXG5cdFx0XHRcdGh0bWxDbGFzc2VzLnJlbW92ZSggJ25hdi1taW5pZmllZCcgKTtcclxuXHRcdFx0XHRodG1sQ2xhc3Nlcy5yZW1vdmUoICduYXYtY29sbGFwc2VkJyApO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnbWluaWZpZWQnICk7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICdjb2xsYXBzZWQnICk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCBuZXdTdGF0ZSA9PT0gJ21pbmlmaWVkJyApIHtcclxuXHJcblx0XHRcdFx0aHRtbENsYXNzZXMuYWRkKCAnbmF2LW1pbmlmaWVkJyApO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnbWluaWZpZWQnICk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCBuZXdTdGF0ZSA9PT0gJ2NvbGxhcHNlZCcgJiYgdGhpcy5zdGF0ZSA9PT0gJ21pbmlmaWVkJyApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICdtaW5pZmllZCcgKTtcclxuXHRcdFx0XHRodG1sQ2xhc3Nlcy5yZW1vdmUoICduYXYtbWluaWZpZWQnICk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCB0aGlzLnN0YXRlID09PSAnY29sbGFwc2VkJyApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICdjb2xsYXBzZWQnICk7XHJcblx0XHRcdFx0aHRtbENsYXNzZXMucmVtb3ZlKCAnbmF2LWNvbGxhcHNlZCcgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHR0aGlzLnN0YXRlID0gbmV3U3RhdGU7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IGV4dHJhIGl0ZW0gcGFkZGluZ1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2V0RXh0cmFJdGVtUGFkZGluZygpOiB2b2lkIHtcclxuXHJcblx0XHQvLyBhdmFpbGFibGUgd2lkdGggdGhlIG1lbnUgaGFzIHRvIGV4cGFuZCB0b1xyXG5cdFx0dmFyIGF2YWlsV2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC0gTUVOVV9SRVNFUlZFRF9XSURUSDtcclxuXHJcblx0XHRsZXQgY2hpbGRyZW5Ub1BhZDogQXJyYXk8SFRNTEVsZW1lbnQ+ID0gW107XHJcblx0XHRsZXQgaTogbnVtYmVyID0gMDtcclxuXHRcdGZvciAoIGk7IGkgPCB0aGlzLm1lbnVDb250YWluZXIuY2hpbGRFbGVtZW50Q291bnQ7IGkrKyApIHtcclxuXHRcdFx0bGV0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXMubWVudUNvbnRhaW5lci5jaGlsZHJlblsgaSBdIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHRpZiAoICFlbC5oYXNBdHRyaWJ1dGUoICdtZW51LWljb24nICkgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucyggJ21lbnUtaWNvbi13aWR0aCcgKSApIHtcclxuXHRcdFx0XHRjaGlsZHJlblRvUGFkLnB1c2goIGVsICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YXZhaWxXaWR0aCAtPSBJVEVNX1NJWkU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBtaW4gd2lkdGggd2l0aCBubyBwYWRkaW5nLCBleGNsdWRpbmcgaWNvbnNcclxuXHRcdGxldCBtaW5XaWR0aE5lZWRlZDogbnVtYmVyID0gdGhpcy5nZXRDb2xsYXBzZWRNZW51V2lkdGgoIHtcclxuXHRcdFx0Zm9udDogXCI2MDAgXCIgKyBJVEVNX0ZPTlRfU0laRSArIFwicHhcIiArIFwiIENlbnR1cnkgR290aGljXCIsXHJcblx0XHRcdGxldHRlclNwYWNpbmc6IFwiMC4wNWVtXCIsXHJcblx0XHRcdGl0ZW1QYWRkaW5nOiAwLFxyXG5cdFx0XHRtaW5JdGVtV2lkdGg6IDAsXHJcblx0XHRcdGV4Y2x1ZGVJY29uczogdHJ1ZVxyXG5cdFx0fSApO1xyXG5cclxuXHJcblx0XHQvLyBzcGFjZSBhdmFpbGFibGUgdG8gZGlzdHJpYnV0ZSB0byBwYWRkaW5nXHJcblx0XHRsZXQgcGFkZGluZ1RvRGlzdHJpYnV0ZTogbnVtYmVyID0gYXZhaWxXaWR0aCAtIG1pbldpZHRoTmVlZGVkO1xyXG5cclxuXHRcdC8vIGl0ZW0gcGFkZGluZ1xyXG5cdFx0bGV0IGV4dHJhSXRlbVBhZGRpbmc6IG51bWJlciA9IHBhZGRpbmdUb0Rpc3RyaWJ1dGUgLyAoIGNoaWxkcmVuVG9QYWQubGVuZ3RoICogMiApO1xyXG5cclxuXHRcdC8vIGVuc3VyZSBtYXgvbWluXHJcblx0XHRpZiAoIGV4dHJhSXRlbVBhZGRpbmcgPiBJVEVNX01BWF9QQURESU5HICkge1xyXG5cdFx0XHRleHRyYUl0ZW1QYWRkaW5nID0gSVRFTV9NQVhfUEFERElORztcclxuXHRcdH0gZWxzZSBpZiAoIGV4dHJhSXRlbVBhZGRpbmcgPCBJVEVNX01JTl9QQURESU5HICkge1xyXG5cdFx0XHRleHRyYUl0ZW1QYWRkaW5nID0gSVRFTV9NSU5fUEFERElORztcclxuXHRcdH1cclxuXHJcblx0XHQvKmNvbnNvbGUuaW5mbyhcclxuXHRcdFx0XCJtaW5XaWR0aE5lZWRlZDogXCIgKyBtaW5XaWR0aE5lZWRlZCArIFwiXFxuXCJcclxuXHRcdFx0KyBcImF2YWlsV2lkdGg6IFwiICsgYXZhaWxXaWR0aCArIFwiXFxuXCJcclxuXHRcdFx0KyBcIndpbGwgZGlzdHJpYnV0ZTogXCIgKyBwYWRkaW5nVG9EaXN0cmlidXRlICsgXCJcXG5cIlxyXG5cdFx0XHQrIFwidG8gXCIgKyBjaGlsZHJlblRvUGFkLmxlbmd0aCArIFwiIGVhY2g6IFwiICsgZXh0cmFJdGVtUGFkZGluZyArIFwiXFxuXCJcclxuXHRcdCk7Ki9cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNldCBwYWRkaW5nIG9uIHRoZSBtZW51IGVsZW1lbnRzXHJcblx0XHQgKi9cclxuXHRcdGZvciAoIGkgPSAwOyBpIDwgY2hpbGRyZW5Ub1BhZC5sZW5ndGg7IGkrKyApIHtcclxuXHRcdFx0bGV0IGVsOiBIVE1MRWxlbWVudCA9IGNoaWxkcmVuVG9QYWRbIGkgXSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0aWYgKCAhZWwuZmlyc3RFbGVtZW50Q2hpbGQgKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IGxpbms6IEhUTUxFbGVtZW50ID0gZWwuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGxpbmsuc3R5bGUucGFkZGluZ0xlZnQgPSBleHRyYUl0ZW1QYWRkaW5nICsgXCJweFwiO1xyXG5cdFx0XHRsaW5rLnN0eWxlLnBhZGRpbmdSaWdodCA9IGV4dHJhSXRlbVBhZGRpbmcgKyBcInB4XCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFx0SGVscGVyIGZ1bmN0aW9uc1xyXG4gKlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlKCBvYmosIGRlZmF1bHRQcm9wcyApIHtcclxuXHRmb3IgKCBsZXQgcHJvcCBpbiBkZWZhdWx0UHJvcHMgKSB7XHJcblx0XHRpZiAoICFvYmouaGFzT3duUHJvcGVydHkoIHByb3AgKSApIHtcclxuXHRcdFx0b2JqWyBwcm9wIF0gPSBkZWZhdWx0UHJvcHNbIHByb3AgXTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgcHJvcGVydHkgZnJvbSBzcmNcclxuKi9cclxuZnVuY3Rpb24gcHJvcCggc3JjLCBhdHRyLCBkZWZhdWx0VmFsdWUgKSB7XHJcblx0cmV0dXJuICggc3JjICYmIHR5cGVvZiBzcmNbIGF0dHIgXSAhPT0gJ3VuZGVmaW5lZCcgJiYgc3JjWyBhdHRyIF0gKSB8fCBkZWZhdWx0VmFsdWU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogV2Ugb25seSBzdXBwb3J0IHJlbS9lbS9wdCBjb252ZXJzaW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBweFZhbHVlKCB2YWwsIG9wdGlvbnMgPSB7fSApIHtcclxuXHR2YXIgYmFzZUZvbnRTaXplID0gcGFyc2VJbnQoIHByb3AoIG9wdGlvbnMsICdiYXNlLWZvbnQtc2l6ZScsIDE2ICksIDEwICk7XHJcblxyXG5cdHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQoIHZhbCApO1xyXG5cdHZhciB1bml0ID0gdmFsLnJlcGxhY2UoIHZhbHVlLCAnJyApO1xyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LWNhc2VcclxuXHRzd2l0Y2ggKCB1bml0ICkge1xyXG5cdFx0Y2FzZSAncmVtJzpcclxuXHRcdGNhc2UgJ2VtJzpcclxuXHRcdFx0cmV0dXJuIHZhbHVlICogYmFzZUZvbnRTaXplO1xyXG5cdFx0Y2FzZSAncHQnOlxyXG5cdFx0XHRyZXR1cm4gdmFsdWUgLyAoIDk2IC8gNzIgKTtcclxuXHRcdGNhc2UgJ3B4JzpcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0dGhyb3cgbmV3IEVycm9yKCBgVGhlIHVuaXQgJHsgdW5pdCB9IGlzIG5vdCBzdXBwb3J0ZWRgICk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQWRkIGN1c3RvbSBsZXR0ZXIgYW5kIHdvcmQgc3BhY2luZ1xyXG4gKi9cclxuZnVuY3Rpb24gYWRkV29yZEFuZExldHRlclNwYWNpbmcoIHdzLCBscyApIHtcclxuXHJcblx0bGV0IHdvcmRBZGRvbiA9IDA7XHJcblx0aWYgKCB3cyApIHtcclxuXHRcdHdvcmRBZGRvbiA9IHB4VmFsdWUoIHdzICk7XHJcblx0fVxyXG5cclxuXHRsZXQgbGV0dGVyQWRkb24gPSAwO1xyXG5cdGlmICggbHMgKSB7XHJcblx0XHRsZXR0ZXJBZGRvbiA9IHB4VmFsdWUoIGxzICk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKCB0ZXh0ICkge1xyXG5cdFx0dmFyIHdvcmRzID0gdGV4dC50cmltKCkucmVwbGFjZSggL1xccysvZ2ksICcgJyApLnNwbGl0KCAnICcgKS5sZW5ndGggLSAxO1xyXG5cdFx0dmFyIGNoYXJzID0gdGV4dC5sZW5ndGg7XHJcblxyXG5cdFx0cmV0dXJuICggd29yZHMgKiB3b3JkQWRkb24gKSArICggY2hhcnMgKiBsZXR0ZXJBZGRvbiApO1xyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcblx0QWxwaGFIZWFkZXJcclxufVxyXG4iLCJpbXBvcnQge1xyXG5cdENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRWaWV3RW5jYXBzdWxhdGlvbixcclxuXHRBZnRlclZpZXdJbml0LFxyXG5cdE9uRGVzdHJveSxcclxuXHRFbGVtZW50UmVmLFxyXG5cdEhvc3RMaXN0ZW5lclxyXG5cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcblx0Um91dGVyLFxyXG5cdE5hdmlnYXRpb25TdGFydFxyXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBBbHBoYUhlYWRlciB9IGZyb20gJy4vdXRpbC9tZW51LWNvbXBvbmVudCc7XHJcblxyXG5cclxuQENvbXBvbmVudCgge1xyXG5cdHNlbGVjdG9yOiAnYWxwaGEtZ2xvYmFsLWhlYWRlcicsXHJcblx0dGVtcGxhdGU6IGBcclxuXHQ8YSAqbmdJZj1cImhvbWVcIiBjbGFzcz1cInF1ZXN0aW9uLW1hcmsgYWdoLWljb24tbG9nb1wiIGlkPVwibW9iaWxlTG9nb1wiIChjbGljayk9XCJvbkhvbWVDbGljaygkZXZlbnQpXCIgW3RhcmdldF09XCJob21lVGFyZ2V0XCI+PC9hPlxyXG5cclxuXHQ8ZGl2IGNsYXNzPVwibWVudS1jb250YWluZXJcIj5cclxuXHJcblx0XHQ8ZGl2ICpuZ0lmPVwiaG9tZVwiIGNsYXNzPVwiYmVmb3JlLW1lbnVcIj5cclxuXHRcdFx0PGEgY2xhc3M9XCJxdWVzdGlvbi1tYXJrIGFnaC1pY29uLWxvZ29cIiAoY2xpY2spPVwib25Ib21lQ2xpY2soJGV2ZW50KVwiIFt0YXJnZXRdPVwiaG9tZVRhcmdldFwiPjwvYT5cclxuXHRcdDwvZGl2PlxyXG5cclxuXHRcdDxkaXYgY2xhc3M9XCJtZW51LWFyZWFcIj5cclxuXHJcblx0XHRcdDx1bCBtZW51LWNvbnRhaW5lciBjbGFzcz1cIm1haW4tbWVudVwiPlxyXG5cclxuXHRcdFx0XHQ8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcblxyXG5cdFx0XHQ8L3VsPlxyXG5cclxuXHRcdDwvZGl2PlxyXG5cclxuXHQ8L2Rpdj5cclxuXHJcbiAgXHRgLFxyXG5cdHN0eWxlVXJsczogWyAnLi4vLi4vLi4vYXNzZXRzL2xlc3Mvc3R5bGVzL2hlYWRlci5sZXNzJyBdLFxyXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSApXHJcbmV4cG9ydCBjbGFzcyBBbHBoYUdsb2JhbEhlYWRlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG5cdHB1YmxpYyBoZWFkZXI6IEFscGhhSGVhZGVyO1xyXG5cclxuXHRASW5wdXQoICdob21lJyApIGhvbWU6IEFycmF5PHN0cmluZz47XHJcblx0QElucHV0KCAnaG9tZVRhcmdldCcgKSBob21lVGFyZ2V0OiBzdHJpbmcgPSAnX3NlbGYnO1xyXG5cdEBJbnB1dCggJ3NlYXJjaCcgKSBzZWFyY2g6IGJvb2xlYW47XHJcblx0QElucHV0KCAnc2VhcmNoLWFjdGlvbicgKSBzZWFyY2hBY3Rpb246IHN0cmluZztcclxuXHRASW5wdXQoICdsYW5ndWFnZXMnICkgbGFuZ3VhZ2VzOiBBcnJheTxhbnk+ID0gW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsb3NlIG1lbnUgd2hlbiBjbGlja2luZyBvbiBzZWxmIGxpbmtcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBldmVudFxyXG5cdCAqL1xyXG5cdEBIb3N0TGlzdGVuZXIoICdjbGljaycsIFsgJyRldmVudCcgXSApIG9uQ2xpY2soIGV2ZW50ICkge1xyXG5cclxuXHRcdGNvbnN0IHRhcmc6IEhUTUxFbGVtZW50ID0gZXZlbnQudGFyZ2V0LFxyXG5cdFx0XHRpc1JvdXRlckxpbms6IGJvb2xlYW4gPSB0YXJnLmhhc0F0dHJpYnV0ZSggJ2hyZWYnICk7XHJcblxyXG5cdFx0aWYgKCBpc1JvdXRlckxpbmsgKSB7XHJcblx0XHRcdC8vIGNsb3NlIHRoZSBuYXYgKHNob3VsZCBjbG9zZSBieSBpdHNlbGYgYnV0IHdoZW4gY2xpY2tpbmcgb24gb3duIGl0ZW1zIG5vIG5hdmlnYXRpb24gb2NjdXJzKVxyXG5cdFx0XHR0aGlzLmhlYWRlci5jbG9zZSgpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXHJcblx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcblx0KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBMaXN0ZW4gdG8gbmF2aWdhdGlvbiBldmVudHNcclxuXHRcdCAqIFRvb2xiYXIgaXRlbXMgdGhhdCBnZXQgbW92ZWQgYXJvdW5kIGxvc2UgdGhlaXIgYWJpbGl0eSB0byBoYXZlIHRoZWlyIGNsYXNzZXMgYWRkZWQgLyByZW1vdmVkIGJ5IGFuZ3VsYXJcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xyXG5cclxuXHRcdFx0aWYgKCAhdGhpcy5oZWFkZXIgKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0ICkge1xyXG5cclxuXHRcdFx0XHQvLyBjbG9zZSBhbnkgb3BlbiBuYXZcclxuXHRcdFx0XHR0aGlzLmhlYWRlci5jbG9zZSgpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gKVxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFmdGVyIHZpZXcgYW5kIGNvbnRlbnQgaGFzIGJlZW4gcmVuZGVyZWQsIGNoZWNrIHRoZSBtZW51IHdpZHRoc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gdXNlIG91ciBjb21tb24gbWVudSBzaXppbmcgbGliXHJcblx0XHR0aGlzLmhlYWRlciA9IG5ldyBBbHBoYUhlYWRlciggdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB7XHJcblxyXG5cdFx0XHRzZWFyY2g6IHRoaXMuc2VhcmNoID8geyBhY3Rpb246IHRoaXMuc2VhcmNoQWN0aW9uIH0gOiBmYWxzZSxcclxuXHRcdFx0bGFuZ3VhZ2VzOiB0aGlzLmxhbmd1YWdlcyxcclxuXHRcdFx0Y2xvc2VTdWJNZW51c09uQ2xpY2s6IHRydWVcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogb24gY2xpY2sgb2YgdGhlIGhvbWUgbGluayBlaXRoZXIgdXNlIHRoZSByb3V0ZXIsIG9yIGFsbG93IHRvIG9wZW4gaW4gbmV3IHRhYlxyXG5cdCAqIEBwYXJhbSBldmVudFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBvbkhvbWVDbGljayggZXZlbnQ6IE1vdXNlRXZlbnQgKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmhvbWUgaW5zdGFuY2VvZiBBcnJheSApIHtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZSggdGhpcy5ob21lICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgbGluazogSFRNTEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCAnaHJlZicsIHRoaXMuaG9tZSApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYW51cCBvbiBkZXN0cm95XHJcblx0ICovXHJcblx0cHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG5cclxuXHRcdHRoaXMuaGVhZGVyLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFscGhhR2xvYmFsSGVhZGVyIH0gZnJvbSAnLi9hbHBoYS1nbG9iYWwtaGVhZGVyLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoIHtcclxuXHRkZWNsYXJhdGlvbnM6IFtcclxuXHRcdEFscGhhR2xvYmFsSGVhZGVyXHJcblx0XSxcclxuXHRleHBvcnRzOiBbXHJcblx0XHRBbHBoYUdsb2JhbEhlYWRlcixcclxuXHRdLFxyXG5cdGltcG9ydHM6IFtcclxuXHRcdENvbW1vbk1vZHVsZSxcclxuXHRdXHJcblxyXG59IClcclxuZXhwb3J0IGNsYXNzIEFscGhhR2xvYmFsSGVhZGVyTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsicm91dGVyIiwiTmF2aWdhdGlvblN0YXJ0IiwiQ29tcG9uZW50IiwiVmlld0VuY2Fwc3VsYXRpb24iLCJFbGVtZW50UmVmIiwiUm91dGVyIiwiSW5wdXQiLCJIb3N0TGlzdGVuZXIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1FBRU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUzs7UUFHaEQsU0FBUyxHQUFHLEVBQUU7O1FBQ2QsZ0JBQWdCLEdBQUcsRUFBRTs7UUFDckIsZ0JBQWdCLEdBQUcsRUFBRTs7UUFDckIsY0FBYyxHQUFHLEVBQUU7O1FBQ25CLG1CQUFtQixHQUFHLEVBQUU7Ozs7O0lBSzlCOzs7Ozs7UUEyQkMscUJBQ1EsT0FBTyxFQUNkLE9BQU87WUFGUixpQkE2Q0M7WUE1Q08sWUFBTyxHQUFQLE9BQU8sQ0FBQTtZQWxCUixhQUFRLEdB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