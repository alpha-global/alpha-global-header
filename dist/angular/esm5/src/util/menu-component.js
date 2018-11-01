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
        ;
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
        if (extraClass === void 0) { extraClass = ''; }
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
            if (null !== (code = ((/** @type {?} */ (event.target))).getAttribute('data-lang'))) {
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
        if (overwrites === void 0) { overwrites = {}; }
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
        var fontSize = ITEM_FONT_SIZE + "px"
        // available width the menu has to expand to
        ;
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
            var el = (/** @type {?} */ (this.menuContainer.children[i]));
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
            var el = (/** @type {?} */ (childrenToPad[i]));
            if (!el.firstElementChild) {
                continue;
            }
            /** @type {?} */
            var link = (/** @type {?} */ (el.firstElementChild));
            link.style.paddingLeft = extraItemPadding + "px";
            link.style.paddingRight = extraItemPadding + "px";
        }
    };
    return AlphaHeader;
}());
if (false) {
    /** @type {?} */
    AlphaHeader.prototype.toolBar;
    /** @type {?} */
    AlphaHeader.prototype.menuContainer;
    /** @type {?} */
    AlphaHeader.prototype.searchArea;
    /** @type {?} */
    AlphaHeader.prototype.isCollapsed;
    /** @type {?} */
    AlphaHeader.prototype.isMinified;
    /** @type {?} */
    AlphaHeader.prototype.state;
    /** @type {?} */
    AlphaHeader.prototype.options;
    /** @type {?} */
    AlphaHeader.prototype.defaults;
    /** @type {?} */
    AlphaHeader.prototype.canvasContext;
    /** @type {?} */
    AlphaHeader.prototype._boundResizeFunction;
    /** @type {?} */
    AlphaHeader.prototype._boundClickFunction;
    /** @type {?} */
    AlphaHeader.prototype._boundWindowClickFunction;
    /** @type {?} */
    AlphaHeader.prototype.element;
}
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
    if (options === void 0) { options = {}; }
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
export { AlphaHeader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbHBoYS1nbG9iYWwtaGVhZGVyLyIsInNvdXJjZXMiOlsic3JjL3V0aWwvbWVudS1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBRU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUzs7SUFHaEQsU0FBUyxHQUFHLEVBQUU7O0lBQ2QsZ0JBQWdCLEdBQUcsRUFBRTs7SUFDckIsZ0JBQWdCLEdBQUcsRUFBRTs7SUFDckIsY0FBYyxHQUFHLEVBQUU7O0lBQ25CLG1CQUFtQixHQUFHLEVBQUU7Ozs7O0FBSzlCOzs7Ozs7SUEyQkMscUJBQ1EsT0FBTyxFQUNkLE9BQU87UUFGUixpQkE2Q0M7UUE1Q08sWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQWxCUixhQUFRLEdBQVE7WUFDdEIsV0FBVyxFQUFFLEVBQUU7WUFDZixRQUFRLEVBQUUsTUFBTTtZQUNoQixhQUFhLEVBQUUsRUFBRTtZQUNqQixXQUFXLEVBQUUsRUFBRTs7WUFDZixtQkFBbUIsRUFBRSxnQkFBZ0I7WUFDckMsb0JBQW9CLEVBQUUsS0FBSztZQUMzQixTQUFTLEVBQUUsRUFBRTtTQUViLENBQUM7UUFhRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFFLGtCQUFrQixDQUFFLENBQUM7UUFFdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUM7UUFFckQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0IsSUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxN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QUM7QUFDSCxDQUFDO0FBRUQsT0FBTyxFQUNOLFdBQVcsRUFDWCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIHJlZmVyZW5jZSB0byBkb2N1bWVudCBlbGVtZW50IGNsYXNzZXNcclxuY29uc3QgaHRtbENsYXNzZXMgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0O1xyXG5cclxuXHJcbmNvbnN0IElURU1fU0laRSA9IDg0O1xyXG5jb25zdCBJVEVNX01BWF9QQURESU5HID0gNTA7XHJcbmNvbnN0IElURU1fTUlOX1BBRERJTkcgPSAxNTtcclxuY29uc3QgSVRFTV9GT05UX1NJWkUgPSAxODtcclxuY29uc3QgTUVOVV9SRVNFUlZFRF9XSURUSCA9IDg0OyAvLyB0aGUgbG9nbyBpcyBvbmx5IHJlcXVpcmVkIHNwYWNlXHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIGluIHBvbHltZXIgYW5kIGFuZ3VsYXIgdG8gY29uc3RydWN0IGFuZCBtYW5hZ2UgdGhlIG1lbnVcclxuICovXHJcbmNsYXNzIEFscGhhSGVhZGVyIHtcclxuXHJcblx0cHVibGljIHRvb2xCYXI6IEhUTUxFbGVtZW50O1xyXG5cdHB1YmxpYyBtZW51Q29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHRwdWJsaWMgc2VhcmNoQXJlYTogSFRNTEVsZW1lbnQ7XHJcblxyXG5cdHB1YmxpYyBpc0NvbGxhcHNlZDogYm9vbGVhbjtcclxuXHRwdWJsaWMgaXNNaW5pZmllZDogYm9vbGVhbjtcclxuXHRwdWJsaWMgc3RhdGU6IHN0cmluZztcclxuXHRwdWJsaWMgb3B0aW9uczogYW55O1xyXG5cdHB1YmxpYyBkZWZhdWx0czogYW55ID0ge1xyXG5cdFx0bWluSXRlbVNpemU6IDEwLFxyXG5cdFx0Zm9udFNpemU6IFwiMTBweFwiLFxyXG5cdFx0cmVzZXJ2ZWRXaWR0aDogNTAsXHJcblx0XHRpdGVtUGFkZGluZzogMTAsIC8vICogeCAyLFxyXG5cdFx0dG9vbEJhckl0ZW1TZWxlY3RvcjogJ1t0b29sYmFyLWl0ZW1dJyxcclxuXHRcdGNsb3NlU3ViTWVudXNPbkNsaWNrOiBmYWxzZSxcclxuXHRcdGxhbmd1YWdlczogW11cclxuXHJcblx0fTtcclxuXHJcblx0cHJpdmF0ZSBjYW52YXNDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG5cdHByaXZhdGUgX2JvdW5kUmVzaXplRnVuY3Rpb246IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q7XHJcblx0cHJpdmF0ZSBfYm91bmRDbGlja0Z1bmN0aW9uOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0O1xyXG5cdHByaXZhdGUgX2JvdW5kV2luZG93Q2xpY2tGdW5jdGlvbjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdDtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwdWJsaWMgZWxlbWVudCxcclxuXHRcdG9wdGlvbnNcclxuXHQpIHtcclxuXHJcblx0XHR0aGlzLmlzQ29sbGFwc2VkID0gZmFsc2U7XHJcblx0XHR0aGlzLmlzTWluaWZpZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuc3RhdGUgPSAnJztcclxuXHRcdHRoaXMubWVudUNvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCAnW21lbnUtY29udGFpbmVyXScgKTtcclxuXHJcblx0XHR0aGlzLm9wdGlvbnMgPSBtZXJnZSggb3B0aW9ucyB8fCB7fSwgdGhpcy5kZWZhdWx0cyApO1xyXG5cclxuXHRcdHRoaXMuYXR0YWNoVG9vbGJhckVsZW1lbnRzKCk7XHJcblxyXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMubGFuZ3VhZ2VzLmxlbmd0aCApIHtcclxuXHRcdFx0dGhpcy5tZW51Q29udGFpbmVyLmFwcGVuZENoaWxkKCB0aGlzLmNyZWF0ZUxhbmd1YWdlTWVudSggJ25vLWN1cnNvcicgKSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNyZWF0ZSBzdWIgbWVudSB0b2dnbGVzXHJcblx0XHR0aGlzLmF0dGFjaFN1Yk1lbnVUb2dnbGVzKCk7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIHRvb2xiYXIgbWVudSBhZnRlciBzdWItbWVudSB0b2dnbGVcclxuXHRcdGlmICggdGhpcy5vcHRpb25zLmxhbmd1YWdlcy5sZW5ndGggKSB7XHJcblx0XHRcdHRoaXMudG9vbEJhci5pbnNlcnRCZWZvcmUoIHRoaXMuY3JlYXRlTGFuZ3VhZ2VNZW51KCAnc3ViLW1lbnUtdG9nZ2xlJyApLCB0aGlzLnRvb2xCYXIuZmlyc3RDaGlsZCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5vcHRpb25zLnNlYXJjaCApIHtcclxuXHRcdFx0dGhpcy5jcmVhdGVTZWFyY2hBcmVhKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XHJcblx0XHRcdHRoaXMuY2hlY2soKTtcclxuXHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoICdyZWFkeScgKTtcclxuXHRcdH0gKTtcclxuXHJcblx0XHR0aGlzLl9ib3VuZFJlc2l6ZUZ1bmN0aW9uID0gdGhpcy5jaGVjay5iaW5kKCB0aGlzICk7XHJcblx0XHR0aGlzLl9ib3VuZENsaWNrRnVuY3Rpb24gPSB0aGlzLm9uQ2xpY2suYmluZCggdGhpcyApO1xyXG5cdFx0dGhpcy5fYm91bmRXaW5kb3dDbGlja0Z1bmN0aW9uID0gdGhpcy5vbldpbmRvd0NsaWNrLmJpbmQoIHRoaXMgKTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMuX2JvdW5kUmVzaXplRnVuY3Rpb24gKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5fYm91bmRDbGlja0Z1bmN0aW9uICk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMuX2JvdW5kV2luZG93Q2xpY2tGdW5jdGlvbiApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpc3RlbiB0byBjbGlja3Mgb24gdGhlIHdpbmRvdyB0byBjbG9zZSBvcGVuIG5hdiBtZW51c1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgb25XaW5kb3dDbGljayggZXZlbnQgKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gaWYgdGhlIGNsaWNrIGNhbWUgZnJvbSB0aGUgbWVudSwgZG9udCBkbyBhbnl0aGluZ1xyXG5cdFx0aWYgKCBldmVudC5pc01lbnVDbGljayApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2xvc2VTdWJNZW51cygpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlIGNsaWNrcyBvbiBkaWZmZXJlbnQgZWxlbWVudHNcclxuXHQgKi9cclxuXHRwcml2YXRlIG9uQ2xpY2soIGV2ZW50ICk6IHZvaWQge1xyXG5cclxuXHRcdGV2ZW50LmlzTWVudUNsaWNrID0gdHJ1ZTtcclxuXHJcblxyXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMuY2xvc2VTdWJNZW51c09uQ2xpY2sgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoICduYXYtb3BlbicgKSApIHtcclxuXHRcdFx0Ly8gY2xvc2Ugc3ViLW1lbnVzIGlmIHRoZSBjbGljayBjYW1lIGZyb20gdGhlcmVcclxuXHRcdFx0bGV0IG1lbnVDb250YWluZXIgPSBldmVudC5jb21wb3NlZFBhdGgoKS5maWx0ZXIoIGZ1bmN0aW9uICggZWwgKSB7IHJldHVybiBlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCAnc3ViLW1lbnUnICk7IH0gKVxyXG5cdFx0XHRpZiAoIG1lbnVDb250YWluZXIubGVuZ3RoICkge1xyXG5cdFx0XHRcdGNvbnN0IHBhcmVudEVsOiBIVE1MRWxlbWVudCA9IG1lbnVDb250YWluZXJbIDAgXS5wYXJlbnRFbGVtZW50O1xyXG5cdFx0XHRcdGlmICggcGFyZW50RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCAnb3BlbicgKSApIHtcclxuXHRcdFx0XHRcdHBhcmVudEVsLmNsYXNzTGlzdC5yZW1vdmUoICdvcGVuJyApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnNwb29mQ2xvc2VTdWJNZW51KCBwYXJlbnRFbCApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdWIgbWVudSB0b2dnbGUgY2xpY2tzXHJcblx0XHQgKi9cclxuXHRcdGlmICggZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyggJ3N1Yi1tZW51LXRvZ2dsZScgKSApIHtcclxuXHJcblx0XHRcdGxldCBtZW51dGFyZ2V0O1xyXG5cdFx0XHRpZiAoIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdtZW51LWl0ZW0taGFzLWNoaWxkcmVuJyApICkge1xyXG5cclxuXHRcdFx0XHRtZW51dGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRtZW51dGFyZ2V0ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBpc09wZW46IGJvb2xlYW4gPSBtZW51dGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyggJ29wZW4nICk7XHJcblxyXG5cdFx0XHR0aGlzLmNsb3NlU3ViTWVudXMoKTtcclxuXHJcblx0XHRcdGlmICggaXNPcGVuICkge1xyXG5cdFx0XHRcdG1lbnV0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSggJ29wZW4nICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bWVudXRhcmdldC5jbGFzc0xpc3QuYWRkKCAnb3BlbicgKTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblxyXG5cdFx0fSBlbHNlIGlmICggZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyggJ3NlYXJjaC1mb3JtLWNsb3NlJyApICkge1xyXG5cclxuXHRcdFx0dGhpcy5jbG9zZVNlYXJjaCgpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdzZWFyY2gtaWNvbicgKSApIHtcclxuXHJcblx0XHRcdHRoaXMub3BlblNlYXJjaCgpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoICdtZW51LXRvZ2dsZScgKSApIHtcclxuXHJcblx0XHRcdHRoaXMub3BlbigpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LnRhcmdldC5pZCA9PT0gJ2Nsb3NlQnV0dG9uJyApIHtcclxuXHJcblx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluIGFuZ3VsYXIgc2l0dWF0aW9ucywgdGhlIHBhZ2UgZG9lc24ndCBuYXZpZ2F0ZSwgc28gYSBob3ZlcmVkIHN1Yi1tZW51IHdpbGwgcmVtYWluIG9wZW4gYWZ0ZXIgYSBjbGlja1xyXG5cdCAqIFRoaXMgd2lsbFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc3Bvb2ZDbG9zZVN1Yk1lbnUoIGVsZW1lbnQgKSB7XHJcblx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IElURU1fU0laRSArICdweCc7XHJcblx0XHRlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcblx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9ICcnO1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnJztcclxuXHJcblxyXG5cdFx0fSwgMTAwIClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdvIHRocm91Z2ggZWFjaCBkaXJlY3QgY2hpbGRyZW4gb2YgdGhlIHVsIG1lbnUgY29udGFpbmVyLCBtZWFzdXJlIHRoZSByZXF1aXJlZCB0ZXh0IGZvciBlYWNoIGVsZW1lbnQgcGx1cyBzb21lIHBhZGRpbmdcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldENvbGxhcHNlZE1lbnVXaWR0aCggb3B0aW9ucyApOiBudW1iZXIge1xyXG5cclxuXHRcdHZhciBtaW5XaWR0aCA9IDAsXHJcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LFxyXG5cdFx0XHRmb250ID0gb3B0aW9ucy5mb250IHx8IFwiMTBweCBBcmlhbFwiLFxyXG5cdFx0XHRsZXR0ZXJTcGFjaW5nID0gb3B0aW9ucy5sZXR0ZXJTcGFjaW5nIHx8IDAsXHJcblx0XHRcdGl0ZW1QYWRkaW5nID0gb3B0aW9ucy5pdGVtUGFkZGluZyB8fCAwLFxyXG5cdFx0XHRtaW5JdGVtV2lkdGggPSBvcHRpb25zLm1pbkl0ZW1XaWR0aCB8fCAwLFxyXG5cdFx0XHR3b3JkU3BhY2luZyA9IG9wdGlvbnMud29yZFNwYWNpbmcgfHwgMCxcclxuXHRcdFx0ZXhjbHVkZUljb25zID0gb3B0aW9ucy5leGNsdWRlSWNvbnMgfHwgZmFsc2UsXHJcblx0XHRcdGkgPSAwO1xyXG5cclxuXHRcdGZvciAoIGk7IGkgPCB0aGlzLm1lbnVDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKysgKSB7XHJcblxyXG5cdFx0XHR2YXIgbGlFbCA9IHRoaXMubWVudUNvbnRhaW5lci5jaGlsZHJlblsgaSBdO1xyXG5cclxuXHRcdFx0dmFyIGxpbmsgPSBsaUVsLmZpcnN0RWxlbWVudENoaWxkIHx8IGxpRWwsXHJcblx0XHRcdFx0dGV4dCA9IGxpbmsudGV4dENvbnRlbnQsXHJcblx0XHRcdFx0bmVlZGVkO1xyXG5cclxuXHRcdFx0aWYgKCB0ZXh0ICkge1xyXG5cdFx0XHRcdG5lZWRlZCA9IHRoaXMubWVhc3VyZVdpZHRoKCB0ZXh0LCBmb250LCB7IGxldHRlclNwYWNpbmc6IGxldHRlclNwYWNpbmcsIHdvcmRTcGFjaW5nOiB3b3JkU3BhY2luZyB9ICkgKyBpdGVtUGFkZGluZztcclxuXHRcdFx0fSBlbHNlIGlmICggIWV4Y2x1ZGVJY29ucyApIHtcclxuXHRcdFx0XHRuZWVkZWQgPSBtaW5JdGVtV2lkdGg7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vY29uc29sZS5pbmZvKGxpbmsudGV4dENvbnRlbnQsIG5lZWRlZCk7XHJcblxyXG5cdFx0XHQvLyBlbnN1cmUgbWluIGl0ZW0gd2lkdGhcclxuXHRcdFx0bWluV2lkdGggKz0gbmVlZGVkIDwgbWluSXRlbVdpZHRoID8gbWluSXRlbVdpZHRoIDogbmVlZGVkO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG1pbldpZHRoO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTW92ZSB0b29sYmFyIGVsZW1lbnRzIGludG8gdGhlIHRvb2xiYXIgZnJvbSB0aGUgbWVudVxyXG5cdCAqXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhdHRhY2hUb29sYmFyRWxlbWVudHMoKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIHRoZSB0b29sYmFyIGNvbnRhaW5lclxyXG5cdFx0dGhpcy50b29sQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcclxuXHRcdHRoaXMudG9vbEJhci5jbGFzc0xpc3QuYWRkKCAnbWVudS10b29sYmFyJyApO1xyXG5cclxuXHRcdC8vIGFkZCBhIHNlYXJjaCBpY29uXHJcblx0XHRpZiAoIHRoaXMub3B0aW9ucy5zZWFyY2ggKSB7XHJcblx0XHRcdGNvbnN0IHNlYXJjaEljb246IEhUTUxFbGVtZW50ID0gdGhpcy5jcmVhdGVTZWFyY2hJY29uKCk7XHJcblx0XHRcdHRoaXMudG9vbEJhci5hcHBlbmRDaGlsZCggc2VhcmNoSWNvbiApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFkZCB0aGUgbWVudSBpY29uXHJcblx0XHRjb25zdCBtZW51VG9nZ2xlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdhJyApO1xyXG5cdFx0bWVudVRvZ2dsZS5jbGFzc0xpc3QuYWRkKCAnbWVudS10b2dnbGUnICk7XHJcblx0XHRtZW51VG9nZ2xlLmlubmVySFRNTCA9ICc8aT48L2k+JztcclxuXHRcdHRoaXMudG9vbEJhci5hcHBlbmRDaGlsZCggbWVudVRvZ2dsZSApO1xyXG5cclxuXHRcdC8vIGFkZCB0aGUgY2xvc2UgYnV0dG9uXHJcblx0XHRjb25zdCBjbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnc3BhbicgKTtcclxuXHRcdGNsb3NlQnV0dG9uLmlkID0gJ2Nsb3NlQnV0dG9uJztcclxuXHRcdGNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoICdhZ2gtaWNvbi1jbG9zZS10aGluJyApO1xyXG5cdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCBjbG9zZUJ1dHRvbiApO1xyXG5cclxuXHRcdC8vIGFwcGVuZCB0aGUgdG9vbGJhclxyXG5cdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLnRvb2xCYXIgKTtcclxuXHJcblx0XHQvLyBmaW5kIGR5bmFtaWMgdG9vbGJhciBpdGVtcyBmcm9tIHRoZSB1c2VyIG1hcmt1cFxyXG5cdFx0Y29uc3QgaXRlbXM6IE5vZGVMaXN0ID0gdGhpcy5tZW51Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoIHRoaXMub3B0aW9ucy50b29sQmFySXRlbVNlbGVjdG9yICk7XHJcblxyXG5cdFx0bGV0IGk6IG51bWJlciA9IDAsXHJcblx0XHRcdGxlbjogbnVtYmVyID0gaXRlbXMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAoIGk7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdFx0Y29uc3QgaXRlbTogTm9kZSA9IGl0ZW1zWyBpIF07XHJcblx0XHRcdHRoaXMudG9vbEJhci5pbnNlcnRCZWZvcmUoIGl0ZW0sIHRoaXMudG9vbEJhci5maXJzdENoaWxkICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSB0aGUgbGFuZ3VhZ2UgbWVudVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY3JlYXRlTGFuZ3VhZ2VNZW51KCBleHRyYUNsYXNzOiBzdHJpbmcgPSAnJyApOiBIVE1MRWxlbWVudCB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLm9wdGlvbnMubGFuZ3VhZ2VzLmxlbmd0aCA9PT0gMCApIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgbGFuZ3VhZ2VFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XHJcblx0XHRsYW5ndWFnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ21lbnUtaXRlbS1oYXMtY2hpbGRyZW4nICk7XHJcblx0XHRsYW5ndWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCAnbWVudS1pY29uJywgJ3cnICk7XHJcblx0XHRsYW5ndWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCAnbWVudS10aXRsZScsICdMYW5ndWFnZXMnICk7XHJcblxyXG5cdFx0aWYgKCBleHRyYUNsYXNzICkge1xyXG5cdFx0XHRsYW5ndWFnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCggZXh0cmFDbGFzcyApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBzdWJNZW51OiBzdHJpbmcgPSAnPHVsIGNsYXNzPVwic3ViLW1lbnVcIj4nLFxyXG5cdFx0XHRpOiBudW1iZXIgPSAwLFxyXG5cdFx0XHRsZW46IG51bWJlciA9IHRoaXMub3B0aW9ucy5sYW5ndWFnZXMubGVuZ3RoO1xyXG5cclxuXHRcdGZvciAoIGk7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdFx0Y29uc3QgbGFuZ3VhZ2UgPSB0aGlzLm9wdGlvbnMubGFuZ3VhZ2VzWyBpIF07XHJcblx0XHRcdGxldCBocmVmOiBzdHJpbmcgPSAnamF2YXNjcmlwdDp2b2lkKDApJztcclxuXHRcdFx0bGV0IGF0dHI6IHN0cmluZyA9ICcnO1xyXG5cdFx0XHRpZiAoIGxhbmd1YWdlLmNvZGUgKSB7XHJcblx0XHRcdFx0YXR0ciA9ICdkYXRhLWxhbmc9XCInICsgbGFuZ3VhZ2UuY29kZSArICdcIic7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCBsYW5ndWFnZS5ocmVmICkge1xyXG5cdFx0XHRcdGhyZWYgPSBsYW5ndWFnZS5ocmVmO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdWJNZW51ICs9ICc8bGk+PGEgJyArIGF0dHIgKyAnIGhyZWY9XCInICsgaHJlZiArICdcIj4nICsgbGFuZ3VhZ2UubGFiZWwgKyAnPC9hPjwvbGk+JztcclxuXHRcdH1cclxuXHJcblx0XHRzdWJNZW51ICs9ICc8L3VsPic7XHJcblxyXG5cdFx0bGFuZ3VhZ2VFbGVtZW50LmlubmVySFRNTCA9IHN1Yk1lbnU7XHJcblxyXG5cdFx0bGFuZ3VhZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsICggZXZlbnQ6IE1vdXNlRXZlbnQgKSA9PiB7XHJcblxyXG5cdFx0XHRsZXQgY29kZSA9IG51bGw7XHJcblx0XHRcdGlmICggbnVsbCAhPT0gKCBjb2RlID0gKCBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQgKS5nZXRBdHRyaWJ1dGUoICdkYXRhLWxhbmcnICkgKSApIHtcclxuXHRcdFx0XHRsZXQgdXJsOiBVUkwgPSBuZXcgVVJMKCBkb2N1bWVudC5sb2NhdGlvbi5ocmVmICk7XHJcblx0XHRcdFx0dXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoICdsYW5nJyApO1xyXG5cdFx0XHRcdHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCAnbGFuZycsIGNvZGUgKTtcclxuXHRcdFx0XHRkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsLmhyZWY7XHJcblx0XHRcdH1cclxuXHRcdH0gKTtcclxuXHJcblx0XHRyZXR1cm4gbGFuZ3VhZ2VFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIGFuIGljb24gdG8gb3BlbiB0aGUgc2VhcmNoXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjcmVhdGVTZWFyY2hJY29uKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdGNvbnN0IHNlYXJjaEljb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcclxuXHRcdHNlYXJjaEljb24uY2xhc3NMaXN0LmFkZCggJ3NlYXJjaC1pY29uJyApO1xyXG5cdFx0c2VhcmNoSWNvbi5zZXRBdHRyaWJ1dGUoICdtZW51LWljb24nLCAnZycgKTtcclxuXHRcdHJldHVybiBzZWFyY2hJY29uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIHRoZSBzZWFyY2ggYXJlYVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY3JlYXRlU2VhcmNoQXJlYSgpOiB2b2lkIHtcclxuXHJcblx0XHQvLyBjcmVhdGUgdGhlIHNlYXJjaCBmb3JtXHJcblx0XHR0aGlzLnNlYXJjaEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xyXG5cdFx0dGhpcy5zZWFyY2hBcmVhLmNsYXNzTGlzdC5hZGQoICdtZW51LXNlYXJjaC1hcmVhJyApO1xyXG5cclxuXHRcdC8vIGZvcm0gYWN0aW9uXHJcblx0XHRjb25zdCBzZWFyY2hBY3Rpb246IHN0cmluZyA9IHRoaXMub3B0aW9ucy5zZWFyY2guYWN0aW9uIHx8IFwiXCI7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIGEgVVJMIGZyb20gdGhlIHNlYXJjaCBhY3Rpb25cclxuXHRcdGNvbnN0IHNlYXJjaFVybDogVVJMID0gbmV3IFVSTCggc2VhcmNoQWN0aW9uLCBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gKTtcclxuXHJcblx0XHQvLyBnZXQgdGhlIGZvcm0gdGFyZ2V0XHJcblx0XHRjb25zdCBmb3JtVGFyZ2V0OiBzdHJpbmcgPSBzZWFyY2hVcmwuaG9zdG5hbWUgIT09IGRvY3VtZW50LmxvY2F0aW9uLmhvc3RuYW1lID8gJ19ibGFuaycgOiAnX3NlbGYnO1xyXG5cclxuXHRcdC8vIHRoZSBmb3JtIG1hcmt1cFxyXG5cdFx0dGhpcy5zZWFyY2hBcmVhLmlubmVySFRNTCA9XHJcblx0XHRcdGA8Zm9ybSB0YXJnZXQ9XCIkeyBmb3JtVGFyZ2V0IH1cIiBjbGFzcz1cIm1lbnUtc2VhcmNoXCIgYWN0aW9uPVwiJHsgc2VhcmNoQWN0aW9uIH1cIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWVudS1zZWFyY2gtaW5wdXQtd3JhcHBlclwiPlxyXG5cdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwibWVudS1zZWFyY2gtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJzXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtZm9ybS1jbG9zZSBhZ2gtaWNvbi1jbG9zZS10aGluXCI+PC9kaXY+XHJcblx0XHRcdDwvZm9ybT5gO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSB0aGUgdG9nZ2xlXHJcblx0XHRjb25zdCBzZWFyY2hJY29uOiBIVE1MRWxlbWVudCA9IHRoaXMuY3JlYXRlU2VhcmNoSWNvbigpO1xyXG5cclxuXHRcdC8vIGF0dGFjaCB0aGVtXHJcblx0XHR0aGlzLm1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQoIHNlYXJjaEljb24gKTtcclxuXHRcdHRoaXMubWVudUNvbnRhaW5lci5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLnNlYXJjaEFyZWEgKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEF0dGFjaCBzdWIgbWVudSB0b2dnbGVzXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhdHRhY2hTdWJNZW51VG9nZ2xlcygpOiB2b2lkIHtcclxuXHJcblx0XHRjb25zdCBzdWJNZW51cyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLnN1Yi1tZW51JyApO1xyXG5cclxuXHRcdGxldCBpOiBudW1iZXIgPSAwLFxyXG5cdFx0XHRsZW46IG51bWJlciA9IHN1Yk1lbnVzLmxlbmd0aDtcclxuXHJcblx0XHRmb3IgKCBpOyBpIDwgbGVuOyBpKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgc3ViTWVudSA9IHN1Yk1lbnVzWyBpIF07XHJcblxyXG5cdFx0XHRjb25zdCB0b2dnbGU6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ3NwYW4nICk7XHJcblx0XHRcdHRvZ2dsZS5jbGFzc0xpc3QuYWRkKCAnc3ViLW1lbnUtdG9nZ2xlJyApO1xyXG5cclxuXHRcdFx0c3ViTWVudS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggdG9nZ2xlLCBzdWJNZW51ICk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIE1lYXN1cmUgdGhlIHdpZHRoIG9mIHRleHQgZ2l2ZW4gYSBmb250IGRlZiBhbmQgY3VzdG9tIHByb3BlcnRpZXNcclxuXHQgKi9cclxuXHRwcml2YXRlIG1lYXN1cmVXaWR0aCggdGV4dCwgZm9udCwgb3ZlcndyaXRlczogYW55ID0ge30gKTogbnVtYmVyIHtcclxuXHJcblx0XHR2YXIgbGV0dGVyU3BhY2luZyA9IG92ZXJ3cml0ZXMubGV0dGVyU3BhY2luZyB8fCAwO1xyXG5cdFx0dmFyIHdvcmRTcGFjaW5nID0gb3ZlcndyaXRlcy53b3JkU3BhY2luZyB8fCAwO1xyXG5cdFx0dmFyIGFkZFNwYWNpbmcgPSBhZGRXb3JkQW5kTGV0dGVyU3BhY2luZyggd29yZFNwYWNpbmcsIGxldHRlclNwYWNpbmcgKTtcclxuXHJcblx0XHR2YXIgY3R4ID0gdGhpcy5nZXRDb250ZXh0MmQoIGZvbnQgKTtcclxuXHJcblx0XHRyZXR1cm4gY3R4Lm1lYXN1cmVUZXh0KCB0ZXh0ICkud2lkdGggKyBhZGRTcGFjaW5nKCB0ZXh0ICk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgY2FudmFzIGVsZW1lbnQgdG8gbWVhc3VyZSB0ZXh0IHdpdGhcclxuXHQgKi9cclxuXHRwcml2YXRlIGdldENvbnRleHQyZCggZm9udCApOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xyXG5cclxuXHRcdGlmICggdGhpcy5jYW52YXNDb250ZXh0ICkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5jYW52YXNDb250ZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBjdHg6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICkuZ2V0Q29udGV4dCggJzJkJyApO1xyXG5cdFx0XHR2YXIgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHRcdFx0dmFyIGJzciA9IGN0eC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XHJcblx0XHRcdFx0Y3R4Lm1vekJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcclxuXHRcdFx0XHRjdHgubXNCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XHJcblx0XHRcdFx0Y3R4Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XHJcblx0XHRcdFx0Y3R4LmJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHwgMTtcclxuXHRcdFx0Y3R4LmZvbnQgPSBmb250O1xyXG5cdFx0XHRjdHguc2V0VHJhbnNmb3JtKCBkcHIgLyBic3IsIDAsIDAsIGRwciAvIGJzciwgMCwgMCApO1xyXG5cclxuXHRcdFx0dGhpcy5jYW52YXNDb250ZXh0ID0gY3R4O1xyXG5cclxuXHRcdFx0cmV0dXJuIGN0eDtcclxuXHRcdH0gY2F0Y2ggKCBlcnIgKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvciggJ0NhbnZhcyBzdXBwb3J0IHJlcXVpcmVkJyApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBvcGVuKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jbG9zZVN1Yk1lbnVzKCk7XHJcblx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ29wZW4nICk7XHJcblx0XHRodG1sQ2xhc3Nlcy5hZGQoICduYXYtb3BlbicgKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnb3BlbicgKTtcclxuXHRcdGh0bWxDbGFzc2VzLnJlbW92ZSggJ25hdi1vcGVuJyApO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGNsb3NlU3ViTWVudXMoKTogdm9pZCB7XHJcblx0XHRsZXQgb3BlbkVsZW1lbnRzID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcub3BlbicgKTtcclxuXHRcdHZhciBpID0gMCwgbGVuID0gb3BlbkVsZW1lbnRzLmxlbmd0aDtcclxuXHRcdGZvciAoIGk7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBvcGVuRWxlbWVudHNbIGkgXTtcclxuXHRcdFx0aXRlbS5jbGFzc0xpc3QucmVtb3ZlKCAnb3BlbicgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvcGVuU2VhcmNoKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jbG9zZVN1Yk1lbnVzKCk7XHJcblx0XHR0aGlzLnNlYXJjaEFyZWEuY2xhc3NMaXN0LmFkZCggJ29wZW4nICk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2xvc2VTZWFyY2goKTogdm9pZCB7XHJcblxyXG5cdFx0dGhpcy5zZWFyY2hBcmVhLmNsYXNzTGlzdC5yZW1vdmUoICdvcGVuJyApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBsaXN0ZW5lcnNcclxuXHQgKi9cclxuXHRwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuXHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMuX2JvdW5kUmVzaXplRnVuY3Rpb24gKTtcclxuXHJcblx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5fYm91bmRDbGlja0Z1bmN0aW9uICk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXNpemUgZnVuY3Rpb25cclxuXHQgKi9cclxuXHRwdWJsaWMgY2hlY2soKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gZXh0cmFjdCB0aGUgc3VwcG9ydGVkIHZhbHVlc1xyXG5cdFx0dmFyIHJlc2VydmVkV2lkdGggPSBNRU5VX1JFU0VSVkVEX1dJRFRILFxyXG5cdFx0XHRtaW5JdGVtU2l6ZSA9IElURU1fU0laRSxcclxuXHRcdFx0dG9vbEJhckljb25XaWR0aCA9IElURU1fU0laRSxcclxuXHRcdFx0Zm9udFNpemUgPSBJVEVNX0ZPTlRfU0laRSArIFwicHhcIlxyXG5cclxuXHRcdC8vIGF2YWlsYWJsZSB3aWR0aCB0aGUgbWVudSBoYXMgdG8gZXhwYW5kIHRvXHJcblx0XHR2YXIgYXZhaWxXaWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLSByZXNlcnZlZFdpZHRoO1xyXG5cclxuXHJcblx0XHQvLyB3aWR0aCBuZWVkZWQgYnkgdGhlIG1lbnVcclxuXHRcdHZhciBjb2xsYXBzZWRXaWR0aE5lZWRlZCA9IHRoaXMuZ2V0Q29sbGFwc2VkTWVudVdpZHRoKCB7XHJcblx0XHRcdGZvbnQ6IFwiNjAwIFwiICsgZm9udFNpemUgKyBcIiBDZW50dXJ5IEdvdGhpY1wiLFxyXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBcIjAuMDVlbVwiLFxyXG5cdFx0XHRpdGVtUGFkZGluZzogSVRFTV9NSU5fUEFERElORyAqIDIsXHJcblx0XHRcdG1pbkl0ZW1XaWR0aDogbWluSXRlbVNpemVcclxuXHRcdH0gKTtcclxuXHJcblx0XHQvLyB3aWR0aCBuZWVkZWQgZm9yIHRvb2xiYXIgaWNvbiB2aWV3XHJcblx0XHR2YXIgbWluV2lkdGhOZWVkZWQgPSB0aGlzLnRvb2xCYXIuY2hpbGRyZW4ubGVuZ3RoICogdG9vbEJhckljb25XaWR0aDtcclxuXHJcblx0XHQvLyBuZXcgc3RhdGUgdG8gY2hhbmdlIGludG9cclxuXHRcdHZhciBuZXdTdGF0ZTtcclxuXHJcblx0XHQvKmNvbnNvbGUuaW5mbyhcclxuXHRcdFx0XCJhdmFpbGFibGUgd2lkdGg6IFwiICsgYXZhaWxXaWR0aCArIFwiXFxuXCJcclxuXHRcdFx0KyBcIm5lZWQgZm9yIGNvbGxhcHNlZDogXCIgKyBjb2xsYXBzZWRXaWR0aE5lZWRlZCArIFwiXFxuXCJcclxuXHRcdFx0KyBcIm5lZWQgZm9yIHRvb2xiYXI6IFwiICsgbWluV2lkdGhOZWVkZWRcclxuXHRcdCk7Ki9cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrIGNvbmRpdGlvbnMgZm9yIGNvbGxhcHNpbmdcclxuXHRcdCAqL1xyXG5cclxuXHRcdGlmICggYXZhaWxXaWR0aCA8IG1pbldpZHRoTmVlZGVkICkge1xyXG5cclxuXHRcdFx0bmV3U3RhdGUgPSAnbWluaWZpZWQnO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGF2YWlsV2lkdGggPCBjb2xsYXBzZWRXaWR0aE5lZWRlZCApIHtcclxuXHJcblx0XHRcdG5ld1N0YXRlID0gJ2NvbGxhcHNlZCc7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdG5ld1N0YXRlID0gJyc7XHJcblx0XHRcdC8vIHNldCBhbnkgZXh0cmEgaXRlbSBwYWRkaW5nIGF2YWlsYWJsZVxyXG5cdFx0XHR0aGlzLnNldEV4dHJhSXRlbVBhZGRpbmcoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aGlzLnN0YXRlICE9PSBuZXdTdGF0ZSApIHtcclxuXHJcblx0XHRcdGlmICggbmV3U3RhdGUgPT09ICdtaW5pZmllZCcgfHwgbmV3U3RhdGUgPT09ICdjb2xsYXBzZWQnICkge1xyXG5cclxuXHRcdFx0XHRodG1sQ2xhc3Nlcy5hZGQoICduYXYtY29sbGFwc2VkJyApO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnY29sbGFwc2VkJyApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBuZXdTdGF0ZSA9PT0gJycgKSB7XHJcblxyXG5cdFx0XHRcdGh0bWxDbGFzc2VzLnJlbW92ZSggJ25hdi1taW5pZmllZCcgKTtcclxuXHRcdFx0XHRodG1sQ2xhc3Nlcy5yZW1vdmUoICduYXYtY29sbGFwc2VkJyApO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnbWluaWZpZWQnICk7XHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICdjb2xsYXBzZWQnICk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCBuZXdTdGF0ZSA9PT0gJ21pbmlmaWVkJyApIHtcclxuXHJcblx0XHRcdFx0aHRtbENsYXNzZXMuYWRkKCAnbmF2LW1pbmlmaWVkJyApO1xyXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnbWluaWZpZWQnICk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCBuZXdTdGF0ZSA9PT0gJ2NvbGxhcHNlZCcgJiYgdGhpcy5zdGF0ZSA9PT0gJ21pbmlmaWVkJyApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICdtaW5pZmllZCcgKTtcclxuXHRcdFx0XHRodG1sQ2xhc3Nlcy5yZW1vdmUoICduYXYtbWluaWZpZWQnICk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCB0aGlzLnN0YXRlID09PSAnY29sbGFwc2VkJyApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICdjb2xsYXBzZWQnICk7XHJcblx0XHRcdFx0aHRtbENsYXNzZXMucmVtb3ZlKCAnbmF2LWNvbGxhcHNlZCcgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHR0aGlzLnN0YXRlID0gbmV3U3RhdGU7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IGV4dHJhIGl0ZW0gcGFkZGluZ1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2V0RXh0cmFJdGVtUGFkZGluZygpOiB2b2lkIHtcclxuXHJcblx0XHQvLyBhdmFpbGFibGUgd2lkdGggdGhlIG1lbnUgaGFzIHRvIGV4cGFuZCB0b1xyXG5cdFx0dmFyIGF2YWlsV2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC0gTUVOVV9SRVNFUlZFRF9XSURUSDtcclxuXHJcblx0XHRsZXQgY2hpbGRyZW5Ub1BhZDogQXJyYXk8SFRNTEVsZW1lbnQ+ID0gW107XHJcblx0XHRsZXQgaTogbnVtYmVyID0gMDtcclxuXHRcdGZvciAoIGk7IGkgPCB0aGlzLm1lbnVDb250YWluZXIuY2hpbGRFbGVtZW50Q291bnQ7IGkrKyApIHtcclxuXHRcdFx0bGV0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXMubWVudUNvbnRhaW5lci5jaGlsZHJlblsgaSBdIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHRpZiAoICFlbC5oYXNBdHRyaWJ1dGUoICdtZW51LWljb24nICkgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucyggJ21lbnUtaWNvbi13aWR0aCcgKSApIHtcclxuXHRcdFx0XHRjaGlsZHJlblRvUGFkLnB1c2goIGVsICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YXZhaWxXaWR0aCAtPSBJVEVNX1NJWkU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBtaW4gd2lkdGggd2l0aCBubyBwYWRkaW5nLCBleGNsdWRpbmcgaWNvbnNcclxuXHRcdGxldCBtaW5XaWR0aE5lZWRlZDogbnVtYmVyID0gdGhpcy5nZXRDb2xsYXBzZWRNZW51V2lkdGgoIHtcclxuXHRcdFx0Zm9udDogXCI2MDAgXCIgKyBJVEVNX0ZPTlRfU0laRSArIFwicHhcIiArIFwiIENlbnR1cnkgR290aGljXCIsXHJcblx0XHRcdGxldHRlclNwYWNpbmc6IFwiMC4wNWVtXCIsXHJcblx0XHRcdGl0ZW1QYWRkaW5nOiAwLFxyXG5cdFx0XHRtaW5JdGVtV2lkdGg6IDAsXHJcblx0XHRcdGV4Y2x1ZGVJY29uczogdHJ1ZVxyXG5cdFx0fSApO1xyXG5cclxuXHJcblx0XHQvLyBzcGFjZSBhdmFpbGFibGUgdG8gZGlzdHJpYnV0ZSB0byBwYWRkaW5nXHJcblx0XHRsZXQgcGFkZGluZ1RvRGlzdHJpYnV0ZTogbnVtYmVyID0gYXZhaWxXaWR0aCAtIG1pbldpZHRoTmVlZGVkO1xyXG5cclxuXHRcdC8vIGl0ZW0gcGFkZGluZ1xyXG5cdFx0bGV0IGV4dHJhSXRlbVBhZGRpbmc6IG51bWJlciA9IHBhZGRpbmdUb0Rpc3RyaWJ1dGUgLyAoIGNoaWxkcmVuVG9QYWQubGVuZ3RoICogMiApO1xyXG5cclxuXHRcdC8vIGVuc3VyZSBtYXgvbWluXHJcblx0XHRpZiAoIGV4dHJhSXRlbVBhZGRpbmcgPiBJVEVNX01BWF9QQURESU5HICkge1xyXG5cdFx0XHRleHRyYUl0ZW1QYWRkaW5nID0gSVRFTV9NQVhfUEFERElORztcclxuXHRcdH0gZWxzZSBpZiAoIGV4dHJhSXRlbVBhZGRpbmcgPCBJVEVNX01JTl9QQURESU5HICkge1xyXG5cdFx0XHRleHRyYUl0ZW1QYWRkaW5nID0gSVRFTV9NSU5fUEFERElORztcclxuXHRcdH1cclxuXHJcblx0XHQvKmNvbnNvbGUuaW5mbyhcclxuXHRcdFx0XCJtaW5XaWR0aE5lZWRlZDogXCIgKyBtaW5XaWR0aE5lZWRlZCArIFwiXFxuXCJcclxuXHRcdFx0KyBcImF2YWlsV2lkdGg6IFwiICsgYXZhaWxXaWR0aCArIFwiXFxuXCJcclxuXHRcdFx0KyBcIndpbGwgZGlzdHJpYnV0ZTogXCIgKyBwYWRkaW5nVG9EaXN0cmlidXRlICsgXCJcXG5cIlxyXG5cdFx0XHQrIFwidG8gXCIgKyBjaGlsZHJlblRvUGFkLmxlbmd0aCArIFwiIGVhY2g6IFwiICsgZXh0cmFJdGVtUGFkZGluZyArIFwiXFxuXCJcclxuXHRcdCk7Ki9cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNldCBwYWRkaW5nIG9uIHRoZSBtZW51IGVsZW1lbnRzXHJcblx0XHQgKi9cclxuXHRcdGZvciAoIGkgPSAwOyBpIDwgY2hpbGRyZW5Ub1BhZC5sZW5ndGg7IGkrKyApIHtcclxuXHRcdFx0bGV0IGVsOiBIVE1MRWxlbWVudCA9IGNoaWxkcmVuVG9QYWRbIGkgXSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0aWYgKCAhZWwuZmlyc3RFbGVtZW50Q2hpbGQgKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IGxpbms6IEhUTUxFbGVtZW50ID0gZWwuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGxpbmsuc3R5bGUucGFkZGluZ0xlZnQgPSBleHRyYUl0ZW1QYWRkaW5nICsgXCJweFwiO1xyXG5cdFx0XHRsaW5rLnN0eWxlLnBhZGRpbmdSaWdodCA9IGV4dHJhSXRlbVBhZGRpbmcgKyBcInB4XCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIFx0SGVscGVyIGZ1bmN0aW9uc1xyXG4gKlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlKCBvYmosIGRlZmF1bHRQcm9wcyApIHtcclxuXHRmb3IgKCBsZXQgcHJvcCBpbiBkZWZhdWx0UHJvcHMgKSB7XHJcblx0XHRpZiAoICFvYmouaGFzT3duUHJvcGVydHkoIHByb3AgKSApIHtcclxuXHRcdFx0b2JqWyBwcm9wIF0gPSBkZWZhdWx0UHJvcHNbIHByb3AgXTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG9iajtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgcHJvcGVydHkgZnJvbSBzcmNcclxuKi9cclxuZnVuY3Rpb24gcHJvcCggc3JjLCBhdHRyLCBkZWZhdWx0VmFsdWUgKSB7XHJcblx0cmV0dXJuICggc3JjICYmIHR5cGVvZiBzcmNbIGF0dHIgXSAhPT0gJ3VuZGVmaW5lZCcgJiYgc3JjWyBhdHRyIF0gKSB8fCBkZWZhdWx0VmFsdWU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogV2Ugb25seSBzdXBwb3J0IHJlbS9lbS9wdCBjb252ZXJzaW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBweFZhbHVlKCB2YWwsIG9wdGlvbnMgPSB7fSApIHtcclxuXHR2YXIgYmFzZUZvbnRTaXplID0gcGFyc2VJbnQoIHByb3AoIG9wdGlvbnMsICdiYXNlLWZvbnQtc2l6ZScsIDE2ICksIDEwICk7XHJcblxyXG5cdHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQoIHZhbCApO1xyXG5cdHZhciB1bml0ID0gdmFsLnJlcGxhY2UoIHZhbHVlLCAnJyApO1xyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LWNhc2VcclxuXHRzd2l0Y2ggKCB1bml0ICkge1xyXG5cdFx0Y2FzZSAncmVtJzpcclxuXHRcdGNhc2UgJ2VtJzpcclxuXHRcdFx0cmV0dXJuIHZhbHVlICogYmFzZUZvbnRTaXplO1xyXG5cdFx0Y2FzZSAncHQnOlxyXG5cdFx0XHRyZXR1cm4gdmFsdWUgLyAoIDk2IC8gNzIgKTtcclxuXHRcdGNhc2UgJ3B4JzpcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHJcblx0dGhyb3cgbmV3IEVycm9yKCBgVGhlIHVuaXQgJHsgdW5pdCB9IGlzIG5vdCBzdXBwb3J0ZWRgICk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQWRkIGN1c3RvbSBsZXR0ZXIgYW5kIHdvcmQgc3BhY2luZ1xyXG4gKi9cclxuZnVuY3Rpb24gYWRkV29yZEFuZExldHRlclNwYWNpbmcoIHdzLCBscyApIHtcclxuXHJcblx0bGV0IHdvcmRBZGRvbiA9IDA7XHJcblx0aWYgKCB3cyApIHtcclxuXHRcdHdvcmRBZGRvbiA9IHB4VmFsdWUoIHdzICk7XHJcblx0fVxyXG5cclxuXHRsZXQgbGV0dGVyQWRkb24gPSAwO1xyXG5cdGlmICggbHMgKSB7XHJcblx0XHRsZXR0ZXJBZGRvbiA9IHB4VmFsdWUoIGxzICk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKCB0ZXh0ICkge1xyXG5cdFx0dmFyIHdvcmRzID0gdGV4dC50cmltKCkucmVwbGFjZSggL1xccysvZ2ksICcgJyApLnNwbGl0KCAnICcgKS5sZW5ndGggLSAxO1xyXG5cdFx0dmFyIGNoYXJzID0gdGV4dC5sZW5ndGg7XHJcblxyXG5cdFx0cmV0dXJuICggd29yZHMgKiB3b3JkQWRkb24gKSArICggY2hhcnMgKiBsZXR0ZXJBZGRvbiApO1xyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcblx0QWxwaGFIZWFkZXJcclxufVxyXG4iXX0=