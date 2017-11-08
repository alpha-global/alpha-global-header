
// reference to document element classes
const htmlClasses = document.documentElement.classList;


const ITEM_SIZE = 84;
const ITEM_MAX_PADDING = 50;
const ITEM_MIN_PADDING = 15;
const ITEM_FONT_SIZE = 18;
const MENU_RESERVED_WIDTH = 84; // the logo is only required space

/**
 * This class is used in polymer and angular to construct and manage the menu
 */
class AlphaHeader {

	public toolBar: HTMLElement;
	public menuContainer: HTMLElement;
	public searchArea: HTMLElement;

	public isCollapsed: boolean;
	public isMinified: boolean;
	public state: string;
	public options: any;
	public defaults: any = {
		minItemSize: 10,
		fontSize: "10px",
		reservedWidth: 50,
		itemPadding: 10, // * x 2,
		toolBarItemSelector: '[toolbar-item]',
		closeSubMenusOnClick: false,
		languages: []

	};

	private canvasContext: CanvasRenderingContext2D;

	private _boundResizeFunction: EventListenerOrEventListenerObject;
	private _boundClickFunction: EventListenerOrEventListenerObject;
	private _boundWindowClickFunction: EventListenerOrEventListenerObject;

	constructor (
		public element,
		options
	) {

		this.isCollapsed = false;
		this.isMinified = false;
		this.state = '';
		this.menuContainer = this.element.querySelector( '[menu-container]' );

		this.options = merge( options || {}, this.defaults );

		this.attachToolbarElements();

		if ( this.options.languages.length ) {
			this.menuContainer.appendChild( this.createLanguageMenu( 'no-cursor' ) );
		}

		// create sub menu toggles
		this.attachSubMenuToggles();

		// create toolbar menu after sub-menu toggle
		if ( this.options.languages.length ) {
			this.toolBar.insertBefore( this.createLanguageMenu( 'sub-menu-toggle' ), this.toolBar.firstChild );
		}

		if ( this.options.search ) {
			this.createSearchArea();
		}

		requestAnimationFrame( () => this.check() );

		this._boundResizeFunction = this.check.bind( this );
		this._boundClickFunction = this.onClick.bind( this );
		this._boundWindowClickFunction = this.onWindowClick.bind( this );

		window.addEventListener( 'resize', this._boundResizeFunction );

		this.element.addEventListener( 'click', this._boundClickFunction );

		window.addEventListener( 'click', this._boundWindowClickFunction );

	}

	/**
	 * Listen to clicks on the window to close open nav menus
	 * @param event
	 */
	private onWindowClick ( event ): void {

		// if the click came from the menu, dont do anything
		if ( event.isMenuClick ) {
			return;
		}

		this.closeSubMenus();
	}

	/**
	 * Handle clicks on different elements
	 *
	 * @param event
	 */
	private onClick ( event ): void {

		event.isMenuClick = true;


		if ( this.options.closeSubMenusOnClick && !document.documentElement.classList.contains( 'nav-open' ) ) {
			// close sub-menus if the click came from there
			let menuContainer = event.composedPath().filter( function ( el ) { return el.classList && el.classList.contains( 'sub-menu' ); } )
			if ( menuContainer.length ) {
				const parentEl: HTMLElement = menuContainer[ 0 ].parentElement;
				if ( parentEl.classList.contains( 'open' ) ) {
					parentEl.classList.remove( 'open' );
				} else {
					this.spoofCloseSubMenu( parentEl );
				}
				return;
			}
		}


		/**
		 * Sub menu toggle clicks
		 */
		if ( event.target.classList.contains( 'sub-menu-toggle' ) ) {

			let menutarget;
			if ( event.target.classList.contains( 'menu-item-has-children' ) ) {

				menutarget = event.target;

			} else {
				menutarget = event.target.parentNode;
			}

			let isOpen: boolean = menutarget.classList.contains( 'open' );

			this.closeSubMenus();

			if ( isOpen ) {
				menutarget.classList.remove( 'open' );
			} else {
				menutarget.classList.add( 'open' );
			}



		} else if ( event.target.classList.contains( 'search-form-close' ) ) {

			this.closeSearch();

		} else if ( event.target.classList.contains( 'search-icon' ) ) {

			this.openSearch();

		} else if ( event.target.classList.contains( 'menu-toggle' ) ) {

			this.open();

		} else if ( event.target.id === 'closeButton' ) {

			this.close();

		}


	}

	/**
	 * In angular situations, the page doesn't navigate, so a hovered sub-menu will remain open after a click
	 * This will
	 * @param element
	 */
	private spoofCloseSubMenu ( element ) {
		element.style.height = ITEM_SIZE + 'px';
		element.style.pointerEvents = 'none';
		setTimeout( function () {

			element.style.height = '';
			element.style.pointerEvents = '';


		}, 100 )
	}

	/**
	 * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
	 */
	private getCollapsedMenuWidth ( options ): number {

		var minWidth = 0,
			options = options || {},
			font = options.font || "10px Arial",
			letterSpacing = options.letterSpacing || 0,
			itemPadding = options.itemPadding || 0,
			minItemWidth = options.minItemWidth || 0,
			wordSpacing = options.wordSpacing || 0,
			excludeIcons = options.excludeIcons || false,
			i = 0;

		for ( i; i < this.menuContainer.children.length; i++ ) {

			var liEl = this.menuContainer.children[ i ];

			var link = liEl.firstElementChild || liEl,
				text = link.textContent,
				needed;

			if ( text ) {
				needed = this.measureWidth( text, font, { letterSpacing: letterSpacing, wordSpacing: wordSpacing } ) + itemPadding;
			} else if ( !excludeIcons ) {
				needed = minItemWidth;
			} else {
				continue;
			}

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
	private attachToolbarElements (): void {

		// create the toolbar container
		this.toolBar = document.createElement( 'div' );
		this.toolBar.classList.add( 'menu-toolbar' );

		// add a search icon
		if ( this.options.search ) {
			const searchIcon: HTMLElement = this.createSearchIcon();
			this.toolBar.appendChild( searchIcon );
		}

		// add the menu icon
		const menuToggle: HTMLElement = document.createElement( 'a' );
		menuToggle.classList.add( 'menu-toggle' );
		menuToggle.innerHTML = '<i></i>';
		this.toolBar.appendChild( menuToggle );

		// add the close button
		const closeButton: HTMLElement = document.createElement( 'span' );
		closeButton.id = 'closeButton';
		closeButton.classList.add( 'agh-icon-close-thin' );
		this.element.appendChild( closeButton );

		// append the toolbar
		this.element.appendChild( this.toolBar );

		// find dynamic toolbar items from the user markup
		const items: NodeList = this.menuContainer.querySelectorAll( this.options.toolBarItemSelector );

		let i: number = 0,
			len: number = items.length;

		for ( i; i < len; i++ ) {
			const item: Node = items[ i ];
			this.toolBar.insertBefore( item, this.toolBar.firstChild );

		}

	}

	/**
	 * Create the language menu
	 */
	private createLanguageMenu ( extraClass: string = '' ): HTMLElement {

		if ( this.options.languages.length === 0 ) {
			return null;
		}

		const languageElement: HTMLElement = document.createElement( 'div' );
		languageElement.classList.add( 'menu-item-has-children' );
		languageElement.setAttribute( 'menu-icon', 'w' );
		languageElement.setAttribute( 'menu-title', 'Languages' );

		if ( extraClass ) {
			languageElement.classList.add( extraClass );
		}

		let subMenu: string = '<ul class="sub-menu">',
			i: number = 0,
			len: number = this.options.languages.length;

		for ( i; i < len; i++ ) {
			const language = this.options.languages[ i ];
			subMenu += '<li><a href="' + language.href + '">' + language.label + '</a></li>';
		}

		subMenu += '</ul>';

		languageElement.innerHTML = subMenu;

		return languageElement;
	}

	/**
	 * Create an icon to open the search
	 */
	private createSearchIcon (): HTMLElement {
		const searchIcon: HTMLElement = document.createElement( 'div' );
		searchIcon.classList.add( 'search-icon' );
		searchIcon.setAttribute( 'menu-icon', 'g' );
		return searchIcon;
	}

	/**
	 * Create the search area
	 */
	private createSearchArea (): void {

		// create the search form
		this.searchArea = document.createElement( 'div' );
		this.searchArea.classList.add( 'menu-search-area' );

		// form action
		const searchAction: string = this.options.search.action || "";

		// create a URL from the search action
		const searchUrl: URL = new URL( searchAction, document.location.origin );

		// get the form target
		const formTarget: string = searchUrl.hostname !== document.location.hostname ? '_blank' : '_self';

		// the form markup
		this.searchArea.innerHTML =
			`<form target="${ formTarget }" class="menu-search" action="${ searchAction }">
				<div class="menu-search-input-wrapper">
					<input class="menu-search-input" type="text" name="s" value="" placeholder="Search">
				</div>
				<div class="search-form-close agh-icon-close-thin"></div>
			</form>`;

		// create the toggle
		const searchIcon: HTMLElement = this.createSearchIcon();

		// attach them
		this.menuContainer.appendChild( searchIcon );
		this.menuContainer.parentElement.appendChild( this.searchArea );
	}

	/**
	 * Attach sub menu toggles
	 */
	private attachSubMenuToggles (): void {

		const subMenus = this.element.querySelectorAll( '.sub-menu' );

		let i: number = 0,
			len: number = subMenus.length;

		for ( i; i < len; i++ ) {

			let subMenu = subMenus[ i ];

			const toggle: HTMLElement = document.createElement( 'span' );
			toggle.classList.add( 'sub-menu-toggle' );

			subMenu.parentNode.insertBefore( toggle, subMenu );
		}

	}


	/**
	 * Measure the width of text given a font def and custom properties
	 *
	 * @param {*} text
	 * @param {*} font
	 * @param {*} overwrites
	 */
	private measureWidth ( text, font, overwrites: any = {} ): number {

		var letterSpacing = overwrites.letterSpacing || 0;
		var wordSpacing = overwrites.wordSpacing || 0;
		var addSpacing = addWordAndLetterSpacing( wordSpacing, letterSpacing );

		var ctx = this.getContext2d( font );

		return ctx.measureText( text ).width + addSpacing( text );
	}

	/**
	 * Get canvas element to measure text with
	 *
	 * @param {*} font
	 */
	private getContext2d ( font ): CanvasRenderingContext2D {

		if ( this.canvasContext ) {
			return this.canvasContext;
		}

		try {
			var ctx: any = document.createElement( 'canvas' ).getContext( '2d' );
			var dpr = window.devicePixelRatio || 1;
			var bsr = ctx.webkitBackingStorePixelRatio ||
				ctx.mozBackingStorePixelRatio ||
				ctx.msBackingStorePixelRatio ||
				ctx.oBackingStorePixelRatio ||
				ctx.backingStorePixelRatio || 1;
			ctx.font = font;
			ctx.setTransform( dpr / bsr, 0, 0, dpr / bsr, 0, 0 );

			this.canvasContext = ctx;

			return ctx;
		} catch ( err ) {
			throw new Error( 'Canvas support required' );
		}
	}


	public open (): void {
		this.closeSubMenus();
		this.element.classList.add( 'open' );
		htmlClasses.add( 'nav-open' );
	}

	public close (): void {
		this.element.classList.remove( 'open' );
		htmlClasses.remove( 'nav-open' );
	}

	public closeSubMenus (): void {
		let openElements = this.element.querySelectorAll( '.open' );
		var i = 0, len = openElements.length;
		for ( i; i < len; i++ ) {
			var item = openElements[ i ];
			item.classList.remove( 'open' );
		}
	}

	public openSearch (): void {
		this.closeSubMenus();
		this.searchArea.classList.add( 'open' );
	}

	public closeSearch (): void {

		this.searchArea.classList.remove( 'open' );

	}

	/**
	 * Remove listeners
	 */
	public destroy (): void {

		window.removeEventListener( 'resize', this._boundResizeFunction );

		this.element.removeEventListener( 'click', this._boundClickFunction );
	}

	/**
	 * Resize function
	 */
	public check (): void {

		// extract the supported values
		var reservedWidth = MENU_RESERVED_WIDTH,
			minItemSize = ITEM_SIZE,
			toolBarIconWidth = ITEM_SIZE,
			fontSize = ITEM_FONT_SIZE + "px"

		// available width the menu has to expand to
		var availWidth = document.body.clientWidth - reservedWidth;


		// width needed by the menu
		var collapsedWidthNeeded = this.getCollapsedMenuWidth( {
			font: "600 " + fontSize + " Century Gothic",
			letterSpacing: "0.05em",
			itemPadding: ITEM_MIN_PADDING * 2,
			minItemWidth: minItemSize
		} );

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

		if ( availWidth < minWidthNeeded ) {

			newState = 'minified';

		} else if ( availWidth < collapsedWidthNeeded ) {

			newState = 'collapsed';

		} else {

			newState = '';
			// set any extra item padding available
			this.setExtraItemPadding();

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

	/**
	 * Set extra item padding
	 */
	private setExtraItemPadding (): void {

		// available width the menu has to expand to
		var availWidth = document.body.clientWidth - MENU_RESERVED_WIDTH;

		let childrenToPad: Array<HTMLElement> = [];
		let i: number = 0;
		for ( i; i < this.menuContainer.childElementCount; i++ ) {
			let el: HTMLElement = this.menuContainer.children[ i ] as HTMLElement;
			if ( !el.hasAttribute( 'menu-icon' ) && !el.classList.contains( 'menu-icon-width' ) ) {
				childrenToPad.push( el );
			} else {
				availWidth -= ITEM_SIZE;
			}
		}

		// min width with no padding, excluding icons
		let minWidthNeeded: number = this.getCollapsedMenuWidth( {
			font: "600 " + ITEM_FONT_SIZE + "px" + " Century Gothic",
			letterSpacing: "0.05em",
			itemPadding: 0,
			minItemWidth: 0,
			excludeIcons: true
		} );


		// space available to distribute to padding
		let paddingToDistribute: number = availWidth - minWidthNeeded;

		// item padding
		let extraItemPadding: number = paddingToDistribute / ( childrenToPad.length * 2 );

		// ensure max/min
		if ( extraItemPadding > ITEM_MAX_PADDING ) {
			extraItemPadding = ITEM_MAX_PADDING;
		} else if ( extraItemPadding < ITEM_MIN_PADDING ) {
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
		for ( i = 0; i < childrenToPad.length; i++ ) {
			let el: HTMLElement = childrenToPad[ i ] as HTMLElement;
			if ( !el.firstElementChild ) {
				continue;
			}
			let link: HTMLElement = el.firstElementChild as HTMLElement;
			link.style.paddingLeft = extraItemPadding + "px";
			link.style.paddingRight = extraItemPadding + "px";
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
function merge ( obj, defaultProps ) {
	for ( let prop in defaultProps ) {
		if ( !obj.hasOwnProperty( prop ) ) {
			obj[ prop ] = defaultProps[ prop ];
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
function prop ( src, attr, defaultValue ) {
	return ( src && typeof src[ attr ] !== 'undefined' && src[ attr ] ) || defaultValue;
}


/**
 * We only support rem/em/pt conversion
 * @param val
 * @param options
 * @return {*}
 */
function pxValue ( val, options = {} ) {
	var baseFontSize = parseInt( prop( options, 'base-font-size', 16 ), 10 );

	var value = parseFloat( val );
	var unit = val.replace( value, '' );
	// eslint-disable-next-line default-case
	switch ( unit ) {
		case 'rem':
		case 'em':
			return value * baseFontSize;
		case 'pt':
			return value / ( 96 / 72 );
		case 'px':
			return value;
	}

	throw new Error( `The unit ${ unit } is not supported` );
}


/**
 * Add custom letter and word spacing
 * @param {*} ws
 * @param {*} ls
 */
function addWordAndLetterSpacing ( ws, ls ) {

	let wordAddon = 0;
	if ( ws ) {
		wordAddon = pxValue( ws );
	}

	let letterAddon = 0;
	if ( ls ) {
		letterAddon = pxValue( ls );
	}

	return function ( text ) {
		var words = text.trim().replace( /\s+/gi, ' ' ).split( ' ' ).length - 1;
		var chars = text.length;

		return ( words * wordAddon ) + ( chars * letterAddon );
	};
}



function getValueOrVariable ( value, el ) {

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

function getValueOrVariableInt ( value, el ) {

	var computedValue = getValueOrVariable( value, el );

	return computedValue ? parseInt( computedValue.replace( 'px', '' ) ) : null;

}


export {
	AlphaHeader
}
