

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
	 * Get canvas element to measure text with
	 *
	 * @param {*} font
	 */
	function getContext2d(font) {
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
			return ctx;
		} catch (err) {
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

		let wordAddon = 0;
		if (ws && blacklist.indexOf(ws) === -1) {
			wordAddon = pxValue(ws);
		}

		let letterAddon = 0;
		if (ls && blacklist.indexOf(ls) === -1) {
			letterAddon = pxValue(ls);
		}

		return function(text) {
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
	function measureWidth( text, font, overwrites:any = {}  ) {

		var letterSpacing = overwrites.letterSpacing || 0;
		var wordSpacing = overwrites.wordSpacing || 0;
		var addSpacing = addWordAndLetterSpacing(wordSpacing, letterSpacing);

		var ctx = getContext2d(font);

		return ctx.measureText(text).width + addSpacing(text);
	}


	/**
	 * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
	 */
	function getMinMenuWidth( menuContainer, options ) {

		var minWidth = 0,
			options = options || {},
			font = options.font || "10px Arial",
			letterSpacing = options.letterSpacing || 0,
			itemPadding = options.itemPadding || 0,
			minItemWidth = options.minItemWidth || 0,
			wordSpacing = options.wordSpacing || 0,
			i = 0;

		for ( i; i < menuContainer.children.length; i++ ) {

			var liEl = menuContainer.children[i];

			if(liEl.nodeName !== 'LI'){
				continue;
			}

			var link = liEl.firstElementChild || liEl,
				text = link.textContent,
				needed;

			if ( text ) {
				needed = measureWidth( text, font, { letterSpacing : letterSpacing, wordSpacing : wordSpacing } );
			} else {
				needed = link.clientWidth;
			}

			// add item padding
			needed += itemPadding;

			//console.info(link.textContent, needed);

			// ensure min item width
			minWidth += needed < minItemWidth ? minItemWidth : needed;

		};

		return minWidth;
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


	/**
	 * Register a nav menu to check it's required size on window resize
	 * @param {*} menu
	 * @param {*} options
	 */
	function registerMenu( menu, options ) {

		var defaults = {
			minItemSize : 10,
			fontSize : "10px",
			reservedWidth : 50,
			itemPadding : 10 // * x 2
		};

		options = merge( options || {}, defaults);

		// the resize function
		var resizeFunction = function() {

			// extract the supported values
		var reservedWidth = getValueOrVariableInt( options.reservedWidth, menu ) || defaults.reservedWidth,
			minItemSize = getValueOrVariableInt( options.minItemSize, menu ) || defaults.minItemSize,
			itemPadding = getValueOrVariableInt( options.itemPadding, menu ) || defaults.itemPadding,
			fontSize = getValueOrVariable( options.fontSize, menu ) || defaults.fontSize;

			// available width the menu has to expand to
			var availWidth = window.innerWidth - reservedWidth;


			// width needed by the menu
			var minWidthNeeded = getMinMenuWidth( menu, {
					font : "600 " + fontSize + " Century Gothic",
					letterSpacing : "0.02em",
					itemPadding : itemPadding * 2,
					minItemWidth : minItemSize
				} );

			// small adjustment
			minWidthNeeded += 16;


			//console.info('need at least: ' + minWidthNeeded + ' have available ' + availWidth)

			if ( availWidth < minWidthNeeded ) {
				if ( options.onCollapse ) {
					options.onCollapse();
				}

			} else {
				if ( options.onExpand ) {
					options.onExpand();
				}
			}

		};

		function start(){
			stop();
			window.addEventListener('resize', resizeFunction);
		}
		function stop(){
			window.removeEventListener('resize', resizeFunction);
		}

		start();

		return {
			start : start,
			stop : stop,
			check : resizeFunction
		};

	}

export {
	getMinMenuWidth,
	registerMenu
}
