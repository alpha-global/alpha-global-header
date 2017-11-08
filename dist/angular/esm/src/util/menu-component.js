// reference to document element classes
var htmlClasses = document.documentElement.classList;
var ITEM_SIZE = 84;
var ITEM_MAX_PADDING = 50;
var ITEM_MIN_PADDING = 15;
var ITEM_FONT_SIZE = 18;
var MENU_RESERVED_WIDTH = 84; // the logo is only required space
/**
 * This class is used in polymer and angular to construct and manage the menu
 */
var AlphaHeader = /** @class */ (function () {
    function AlphaHeader(element, options) {
        var _this = this;
        this.element = element;
        this.defaults = {
            minItemSize: 10,
            fontSize: "10px",
            reservedWidth: 50,
            itemPadding: 10,
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
        requestAnimationFrame(function () { return _this.check(); });
        this._boundResizeFunction = this.check.bind(this);
        this._boundClickFunction = this.onClick.bind(this);
        this._boundWindowClickFunction = this.onWindowClick.bind(this);
        window.addEventListener('resize', this._boundResizeFunction);
        this.element.addEventListener('click', this._boundClickFunction);
        window.addEventListener('click', this._boundWindowClickFunction);
    }
    /**
     * Listen to clicks on the window to close open nav menus
     * @param event
     */
    AlphaHeader.prototype.onWindowClick = function (event) {
        // if the click came from the menu, dont do anything
        if (event.isMenuClick) {
            return;
        }
        this.closeSubMenus();
    };
    /**
     * Handle clicks on different elements
     *
     * @param event
     */
    AlphaHeader.prototype.onClick = function (event) {
        event.isMenuClick = true;
        if (this.options.closeSubMenusOnClick && !document.documentElement.classList.contains('nav-open')) {
            // close sub-menus if the click came from there
            var menuContainer = event.composedPath().filter(function (el) { return el.classList && el.classList.contains('sub-menu'); });
            if (menuContainer.length) {
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
            var menutarget = void 0;
            if (event.target.classList.contains('menu-item-has-children')) {
                menutarget = event.target;
            }
            else {
                menutarget = event.target.parentNode;
            }
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
     * @param element
     */
    AlphaHeader.prototype.spoofCloseSubMenu = function (element) {
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
    AlphaHeader.prototype.getCollapsedMenuWidth = function (options) {
        var minWidth = 0, options = options || {}, font = options.font || "10px Arial", letterSpacing = options.letterSpacing || 0, itemPadding = options.itemPadding || 0, minItemWidth = options.minItemWidth || 0, wordSpacing = options.wordSpacing || 0, excludeIcons = options.excludeIcons || false, i = 0;
        for (i; i < this.menuContainer.children.length; i++) {
            var liEl = this.menuContainer.children[i];
            var link = liEl.firstElementChild || liEl, text = link.textContent, needed;
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
    AlphaHeader.prototype.attachToolbarElements = function () {
        // create the toolbar container
        this.toolBar = document.createElement('div');
        this.toolBar.classList.add('menu-toolbar');
        // add a search icon
        if (this.options.search) {
            var searchIcon = this.createSearchIcon();
            this.toolBar.appendChild(searchIcon);
        }
        // add the menu icon
        var menuToggle = document.createElement('a');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '<i></i>';
        this.toolBar.appendChild(menuToggle);
        // add the close button
        var closeButton = document.createElement('span');
        closeButton.id = 'closeButton';
        closeButton.classList.add('agh-icon-close-thin');
        this.element.appendChild(closeButton);
        // append the toolbar
        this.element.appendChild(this.toolBar);
        // find dynamic toolbar items from the user markup
        var items = this.menuContainer.querySelectorAll(this.options.toolBarItemSelector);
        var i = 0, len = items.length;
        for (i; i < len; i++) {
            var item = items[i];
            this.toolBar.insertBefore(item, this.toolBar.firstChild);
        }
    };
    /**
     * Create the language menu
     */
    AlphaHeader.prototype.createLanguageMenu = function (extraClass) {
        if (extraClass === void 0) { extraClass = ''; }
        if (this.options.languages.length === 0) {
            return null;
        }
        var languageElement = document.createElement('div');
        languageElement.classList.add('menu-item-has-children');
        languageElement.setAttribute('menu-icon', 'w');
        languageElement.setAttribute('menu-title', 'Languages');
        if (extraClass) {
            languageElement.classList.add(extraClass);
        }
        var subMenu = '<ul class="sub-menu">', i = 0, len = this.options.languages.length;
        for (i; i < len; i++) {
            var language = this.options.languages[i];
            subMenu += '<li><a href="' + language.href + '">' + language.label + '</a></li>';
        }
        subMenu += '</ul>';
        languageElement.innerHTML = subMenu;
        return languageElement;
    };
    /**
     * Create an icon to open the search
     */
    AlphaHeader.prototype.createSearchIcon = function () {
        var searchIcon = document.createElement('div');
        searchIcon.classList.add('search-icon');
        searchIcon.setAttribute('menu-icon', 'g');
        return searchIcon;
    };
    /**
     * Create the search area
     */
    AlphaHeader.prototype.createSearchArea = function () {
        // create the search form
        this.searchArea = document.createElement('div');
        this.searchArea.classList.add('menu-search-area');
        // form action
        var searchAction = this.options.search.action || "";
        // create a URL from the search action
        var searchUrl = new URL(searchAction, document.location.origin);
        // get the form target
        var formTarget = searchUrl.hostname !== document.location.hostname ? '_blank' : '_self';
        // the form markup
        this.searchArea.innerHTML =
            "<form target=\"" + formTarget + "\" class=\"menu-search\" action=\"" + searchAction + "\">\n\t\t\t\t<div class=\"menu-search-input-wrapper\">\n\t\t\t\t\t<input class=\"menu-search-input\" type=\"text\" name=\"s\" value=\"\" placeholder=\"Search\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"search-form-close agh-icon-close-thin\"></div>\n\t\t\t</form>";
        // create the toggle
        var searchIcon = this.createSearchIcon();
        // attach them
        this.menuContainer.appendChild(searchIcon);
        this.menuContainer.parentElement.appendChild(this.searchArea);
    };
    /**
     * Attach sub menu toggles
     */
    AlphaHeader.prototype.attachSubMenuToggles = function () {
        var subMenus = this.element.querySelectorAll('.sub-menu');
        var i = 0, len = subMenus.length;
        for (i; i < len; i++) {
            var subMenu = subMenus[i];
            var toggle = document.createElement('span');
            toggle.classList.add('sub-menu-toggle');
            subMenu.parentNode.insertBefore(toggle, subMenu);
        }
    };
    /**
     * Measure the width of text given a font def and custom properties
     *
     * @param {*} text
     * @param {*} font
     * @param {*} overwrites
     */
    AlphaHeader.prototype.measureWidth = function (text, font, overwrites) {
        if (overwrites === void 0) { overwrites = {}; }
        var letterSpacing = overwrites.letterSpacing || 0;
        var wordSpacing = overwrites.wordSpacing || 0;
        var addSpacing = addWordAndLetterSpacing(wordSpacing, letterSpacing);
        var ctx = this.getContext2d(font);
        return ctx.measureText(text).width + addSpacing(text);
    };
    /**
     * Get canvas element to measure text with
     *
     * @param {*} font
     */
    AlphaHeader.prototype.getContext2d = function (font) {
        if (this.canvasContext) {
            return this.canvasContext;
        }
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
            this.canvasContext = ctx;
            return ctx;
        }
        catch (err) {
            throw new Error('Canvas support required');
        }
    };
    AlphaHeader.prototype.open = function () {
        this.closeSubMenus();
        this.element.classList.add('open');
        htmlClasses.add('nav-open');
    };
    AlphaHeader.prototype.close = function () {
        this.element.classList.remove('open');
        htmlClasses.remove('nav-open');
    };
    AlphaHeader.prototype.closeSubMenus = function () {
        var openElements = this.element.querySelectorAll('.open');
        var i = 0, len = openElements.length;
        for (i; i < len; i++) {
            var item = openElements[i];
            item.classList.remove('open');
        }
    };
    AlphaHeader.prototype.openSearch = function () {
        this.closeSubMenus();
        this.searchArea.classList.add('open');
    };
    AlphaHeader.prototype.closeSearch = function () {
        this.searchArea.classList.remove('open');
    };
    /**
     * Remove listeners
     */
    AlphaHeader.prototype.destroy = function () {
        window.removeEventListener('resize', this._boundResizeFunction);
        this.element.removeEventListener('click', this._boundClickFunction);
    };
    /**
     * Resize function
     */
    AlphaHeader.prototype.check = function () {
        // extract the supported values
        var reservedWidth = MENU_RESERVED_WIDTH, minItemSize = ITEM_SIZE, toolBarIconWidth = ITEM_SIZE, fontSize = ITEM_FONT_SIZE + "px";
        // available width the menu has to expand to
        var availWidth = document.body.clientWidth - reservedWidth;
        // width needed by the menu
        var collapsedWidthNeeded = this.getCollapsedMenuWidth({
            font: "600 " + fontSize + " Century Gothic",
            letterSpacing: "0.05em",
            itemPadding: ITEM_MIN_PADDING * 2,
            minItemWidth: minItemSize
        });
        // width needed for toolbar icon view
        var minWidthNeeded = this.toolBar.children.length * toolBarIconWidth;
        // new state to change into
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
    AlphaHeader.prototype.setExtraItemPadding = function () {
        // available width the menu has to expand to
        var availWidth = document.body.clientWidth - MENU_RESERVED_WIDTH;
        var childrenToPad = [];
        var i = 0;
        for (i; i < this.menuContainer.childElementCount; i++) {
            var el = this.menuContainer.children[i];
            if (!el.hasAttribute('menu-icon') && !el.classList.contains('menu-icon-width')) {
                childrenToPad.push(el);
            }
            else {
                availWidth -= ITEM_SIZE;
            }
        }
        // min width with no padding, excluding icons
        var minWidthNeeded = this.getCollapsedMenuWidth({
            font: "600 " + ITEM_FONT_SIZE + "px" + " Century Gothic",
            letterSpacing: "0.05em",
            itemPadding: 0,
            minItemWidth: 0,
            excludeIcons: true
        });
        // space available to distribute to padding
        var paddingToDistribute = availWidth - minWidthNeeded;
        // item padding
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
            var el = childrenToPad[i];
            if (!el.firstElementChild) {
                continue;
            }
            var link = el.firstElementChild;
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
 * @param obj
 * @param defaultProps
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
 * Add custom letter and word spacing
 * @param {*} ws
 * @param {*} ls
 */
function addWordAndLetterSpacing(ws, ls) {
    var wordAddon = 0;
    if (ws) {
        wordAddon = pxValue(ws);
    }
    var letterAddon = 0;
    if (ls) {
        letterAddon = pxValue(ls);
    }
    return function (text) {
        var words = text.trim().replace(/\s+/gi, ' ').split(' ').length - 1;
        var chars = text.length;
        return (words * wordAddon) + (chars * letterAddon);
    };
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
export { AlphaHeader };
//# sourceMappingURL=menu-component.js.map