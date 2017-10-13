
// reference to document element classes
const htmlClasses = document.documentElement.classList;

/**
 * This class is used in polymer and angular to construct and manage the menu
 */
class AlphaHeader {

	public toolBar:HTMLElement;
	public menuContainer:HTMLElement;
	public searchArea:HTMLElement;

	public isCollapsed:boolean;
	public isMinified:boolean;
	public state:string;
	public options:any;
	public defaults:any = {
			minItemSize : 10,
			fontSize : "10px",
			reservedWidth : 50,
			itemPadding : 10, // * x 2,
			toolBarItemSelector : '[toolbar-item]',
			languages : []

		};

		private canvasContext:CanvasRenderingContext2D;

	constructor (
		public element,
		options
	) {

		this.isCollapsed = false,
		this.isMinified = false,
		this.state = '',

		this.menuContainer = this.element.querySelector( '[menu-container]');

		this.options = merge( options || {}, this.defaults );

		this.createLanguageMenu();

		this.attachToolbarElements( );

		this.attachSubMenuToggles( );

		if ( this.options.search ) {
			this.createSearchArea( );
		}

		window.addEventListener( 'resize', () => this.check( ) );

		this.element.addEventListener( 'click', event => this.onClick( event ) );

	}

	/**
	 * Handle clicks on different elements
	 *
	 * @param event
	 */
	private onClick( event ): void {


		if ( event.target.classList.contains ( 'sub-menu-toggle' ) )  {

			event.target.parentNode.classList.toggle( 'open' );

		} else if ( event.target.classList.contains ( 'search-form-close' ) )  {

			this.closeSearch( );

		} else if ( event.target.classList.contains( 'search-icon') ) {

			this.openSearch();

		}else if ( event.target.classList.contains ( 'menu-toggle' ) )  {

			this.open( );

		} else if ( event.target.id === 'closeButton' ) {

			this.close();

		}


	}


	/**
	 * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
	 */
	private getCollapsedMenuWidth( options ): number {

		var minWidth = 0,
			options = options || {},
			font = options.font || "10px Arial",
			letterSpacing = options.letterSpacing || 0,
			itemPadding = options.itemPadding || 0,
			minItemWidth = options.minItemWidth || 0,
			wordSpacing = options.wordSpacing || 0,
			i = 0;

		for ( i; i < this.menuContainer.children.length; i++ ) {

			var liEl = this.menuContainer.children[i];

			var link = liEl.firstElementChild || liEl,
				text = link.textContent,
				needed;

			if ( text ) {
				needed = this.measureWidth( text, font, { letterSpacing : letterSpacing, wordSpacing : wordSpacing } );
			} else {
				needed = minItemWidth;
			}

			// add item padding
			needed += itemPadding;

			//console.info(link.textContent, needed);

			// ensure min item width
			minWidth += needed < minItemWidth ? minItemWidth : needed;

		};

		return minWidth;
	}

	/**
	 * Move toolbar elements into the toolbar from the menu
	 *
	 */
	private attachToolbarElements( ): void {

		// create the toolbar container
		this.toolBar = document.createElement( 'div' );
		this.toolBar.classList.add( 'menu-toolbar' );

		// add a search icon
		if ( this.options.search ) {
			const searchIcon:HTMLElement = this.createSearchIcon();
			this.toolBar.appendChild( searchIcon );
		}

		// add the menu icon
		const menuToggle:HTMLElement = document.createElement( 'a' );
		menuToggle.classList.add( 'menu-toggle' );
		menuToggle.innerHTML = '<i></i>';
		this.toolBar.appendChild( menuToggle );

		// add the close button
		const closeButton:HTMLElement = document.createElement( 'span' );
		closeButton.id = 'closeButton';
		closeButton.classList.add( 'agh-icon-close-thin' );
		this.element.appendChild( closeButton );

		// append the toolbar
		this.element.appendChild( this.toolBar );

		// find dynamic toolbar items from the user markup
		const items:NodeList = this.menuContainer.querySelectorAll( this.options.toolBarItemSelector );

		let i:number = 0,
			len:number = items.length;

		for ( i; i < len; i++ ) {
			const item:Node = items[i],
				  placeholder = item.cloneNode() as HTMLElement;

			placeholder.innerHTML = (item as HTMLElement).innerHTML;

			// insert placeholder
			this.menuContainer.insertBefore( placeholder, item );

			// move item to toolbar
			this.toolBar.insertBefore( item, this.toolBar.firstChild );

		}

	}

	/**
	 * Create the language menu
	 */
	private createLanguageMenu(): void{

		const languageElement:HTMLElement = document.createElement( 'div' );
		languageElement.classList.add( 'menu-item-has-children' );
		languageElement.setAttribute( 'menu-icon', 'w' );
		languageElement.setAttribute( 'menu-title', 'Languages');
		languageElement.setAttribute( 'toolbar-item', '' );

		let subMenu:string = '<ul class="sub-menu">',
			i:number = 0,
			len:number = this.options.languages.length;

		for ( i; i < len; i++ ) {
			const language = this.options.languages[ i ];
			subMenu += '<li><a href="' + language.href + '">' + language.label + '</a></li>';
		}

		subMenu += '</ul>';

		languageElement.innerHTML = subMenu;

		this.menuContainer.appendChild( languageElement );
	}

	/**
	 * Create an icon to open the search
	 */
	private createSearchIcon(): HTMLElement {
		const searchIcon:HTMLElement = document.createElement( 'div' );
		searchIcon.classList.add( 'search-icon' );
		searchIcon.setAttribute( 'menu-icon', 'g' );
		return searchIcon;
	}

	/**
	 * Create the search area
	 */
	private createSearchArea(): void {

		// create the search form
		this.searchArea = document.createElement( 'div' );
		this.searchArea.classList.add( 'menu-search-area' );

		// form action
		const searchAction:string = this.options.search.action || "";

		// create a URL from the search action
		const searchUrl:URL = new URL( searchAction, document.location.origin );

		// get the form target
		const formTarget:string = searchUrl.hostname !== document.location.hostname ? '_blank' : '_self';

		// the form markup
		this.searchArea.innerHTML =
			`<form target="${formTarget}" class="menu-search" action="${searchAction}">
				<div class="menu-search-input-wrapper">
					<input class="menu-search-input" type="text" name="s" value="" placeholder="Search">
				</div>
				<div class="search-form-close agh-icon-close-thin"></div>
			</form>`;

		// create the toggle
		const searchIcon:HTMLElement = this.createSearchIcon();

		// attach them
		this.menuContainer.appendChild( searchIcon );
		this.menuContainer.parentElement.appendChild( this.searchArea );
	}

	/**
	 * Attach sub menu toggles
	 */
	private attachSubMenuToggles(): void {

		const subMenus = this.element.querySelectorAll( '.sub-menu' );

		subMenus.forEach( subMenu  => {

			const toggle:HTMLElement = document.createElement( 'span' );
			toggle.classList.add( 'sub-menu-toggle' );

			subMenu.parentNode.insertBefore( toggle, subMenu );
		});

	}


	/**
	 * Measure the width of text given a font def and custom properties
	 *
	 * @param {*} text
	 * @param {*} font
	 * @param {*} overwrites
	 */
	private measureWidth( text, font, overwrites:any = {}  ): number {

		var letterSpacing = overwrites.letterSpacing || 0;
		var wordSpacing = overwrites.wordSpacing || 0;
		var addSpacing = addWordAndLetterSpacing(wordSpacing, letterSpacing);

		var ctx = this.getContext2d(font);

		return ctx.measureText(text).width + addSpacing(text);
	}

	/**
	 * Get canvas element to measure text with
	 *
	 * @param {*} font
	 */
	private getContext2d(font):CanvasRenderingContext2D {

		if ( this.canvasContext ) {
			return this.canvasContext;
		}

		try {
			var ctx:any = document.createElement('canvas').getContext('2d');
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
		} catch (err) {
			throw new Error('Canvas support required');
		}
	}


	public open(): void {
		this.element.classList.add( 'open' );
		htmlClasses.add( 'nav-open' );
	}

	public close(): void {
		this.element.classList.remove( 'open' );
		htmlClasses.remove( 'nav-open' );
	}

	public openSearch(): void {
		this.searchArea.classList.add( 'open' );
	}

	public closeSearch(): void {

		this.searchArea.classList.remove( 'open' );

	}

	/**
	 * Resize function
	 */
	public check(): void {

		// extract the supported values
		var reservedWidth = getValueOrVariableInt( this.options.reservedWidth, this.menuContainer ) || this.defaults.reservedWidth,
			minItemSize = getValueOrVariableInt( this.options.minItemSize, this.menuContainer ) || this.defaults.minItemSize,
			toolBarIconWidth = getValueOrVariableInt( this.options.toolBarIconWidth, this.menuContainer ) || this.defaults.minItemSize,
			itemPadding = getValueOrVariableInt( this.options.itemPadding, this.menuContainer ) || this.defaults.itemPadding,
			fontSize = getValueOrVariable( this.options.fontSize, this.menuContainer ) || this.defaults.fontSize;

		// available width the menu has to expand to
		var availWidth = window.innerWidth - reservedWidth;


		// width needed by the menu
		var collapsedWidthNeeded = this.getCollapsedMenuWidth( {
				font : "600 " + fontSize + " Century Gothic",
				letterSpacing : "0.02em",
				itemPadding : itemPadding * 2,
				minItemWidth : minItemSize
			} );

		// width needed for toolbar icon view
		var minWidthNeeded = this.toolBar.children.length * toolBarIconWidth;

		// new state to change into
		var newState;

		//console.info('available width: ' + availWidth + ', need for collapsed: ' + collapsedWidthNeeded + ', need for toolbar: ' + minWidthNeeded);

		/**
		 * Check conditions for collapsing
		 */

		if ( availWidth < minWidthNeeded ) {

			newState = 'minified';

		} else if ( availWidth < collapsedWidthNeeded ) {

			newState = 'collapsed';

		} else {

			newState = '';

		}

		if ( this.state !== newState ) {

			if ( newState === 'minified' || newState === 'collapsed' ) {

				htmlClasses.add( 'nav-collapsed' );
				this.element.classList.add( 'collapsed' );

			}

			if ( newState === '' ) {

				htmlClasses.remove( 'nav-minified' );
				htmlClasses.remove( 'nav-collapsed' );
				this.element.classList.remove( 'minified' );
				this.element.classList.remove( 'collapsed' );

			} else if ( newState === 'minified' ) {

				htmlClasses.add( 'nav-minified' );
				this.element.classList.add( 'minified' );

			} else if ( newState === 'collapsed' && this.state === 'minified' ) {

				this.element.classList.remove( 'minified' );
				htmlClasses.remove( 'nav-minified' );

			} else if ( this.state === 'collapsed' ) {

				this.element.classList.remove( 'collapsed' );
				htmlClasses.remove( 'nav-collapsed' );

			}


			this.state = newState;

		}
	}

}

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
function merge( obj, defaultProps ){
	for(let prop in defaultProps){
		if(!obj.hasOwnProperty(prop)){
			obj[prop] = defaultProps[prop];
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
function pxValue(val, options = {}) {
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

	throw new Error(`The unit ${unit} is not supported`);
}


/**
 * Add custom letter and word spacing
 * @param {*} ws
 * @param {*} ls
 */
function addWordAndLetterSpacing(ws, ls) {

	let wordAddon = 0;
	if (ws) {
		wordAddon = pxValue(ws);
	}

	let letterAddon = 0;
	if (ls) {
		letterAddon = pxValue(ls);
	}

	return function(text) {
		var words = text.trim().replace(/\s+/gi, ' ').split(' ').length - 1;
		var chars = text.length;

		return (words * wordAddon) + (chars * letterAddon);
	};
}



function getValueOrVariable( value, el ) {

	if ( value.indexOf( '@' ) >= 0 ) {
		var style = getComputedStyle( el ),
			varValue = style.getPropertyValue( '--' + value.replace( '@', '' ) );

		if ( varValue ) {
			value = varValue;
		} else {
			return null;
		}

	}

	return value;
}

function getValueOrVariableInt( value, el ) {

	var computedValue = getValueOrVariable( value, el );

	return computedValue ? parseInt( computedValue.replace( 'px', '' ) ) : null;

}


export {
	AlphaHeader
}
