import {
	Component,
	Input,
	Directive,
	ViewEncapsulation,
	HostBinding,
	AfterContentInit,
	AfterViewInit,
	ContentChildren,
	ViewChild,
	QueryList,
	ElementRef,
	HostListener

} from '@angular/core';

import { registerMenu } from '../../common/menu-width';

const $htmlClasses = window.document.documentElement.classList;


@Directive( { selector: 'li' } )
export class MenuItem  {}

@Directive( { selector: 'ul' } )
export class SubMenu  {}

@Component( {
	selector : 'alpha-global-header',
	template : `
	<a *ngIf="home" class="question-mark icon-logo" id="mobileLogo" href="[[home]]"></a>
	<div class="menu-wrapper">
		<div class="menu-container">

			<span id="closeButton" class="icon-close-thin" (click)="close()"></span>


			<div *ngIf="home" class="before-menu">
				<a class="question-mark icon-logo" href="[[home]]"></a>
			</div>

			<ul #mainMenu class="main-menu collapsible">

				<ng-content></ng-content>

				<ng-container *ngIf="languages">
					<li class="language-menu bg-darker menu-item menu-item-has-children">
						<a class="icon-globe"></a>
						<a class="language-menu-link" href="#">Languages</a>
						<span class="sub-menu-toggle"></span>
						<ul class="sub-menu">
							<li *ngFor="let language of languages" class="menu-item "><a [href]="language.href">{{ language.label }}</a></li>

						</ul>
					</li>
				</ng-container>

				<ng-container *ngIf="search">
					<li class="menu-item search-element search-element-toggle" (click)="toggleSearchInput()">
						<a class="menu-search-label icon-search"></a>
					</li>
					<div id="menuSearchArea" class="menu-search-area {{ searchOpenClass }}">
						<form class="menu-search" [action]="searchAction">
							<div class="menu-search-input-wrapper">
								<input class="menu-search-input" type="text" name="s" value="" placeholder="Search">
							</div>
							<div class="search-form-close icon-close-thin" (click)="toggleSearchInput()"></div>
						</form>
					</div>
				</ng-container>

			</ul>

		</div>
	</div>

	<div class="menu-toggle" (click)="toggleMenu()"><i></i></div>
  	`,
	styleUrls: ['../../../assets/less/styles/header.less'],
	encapsulation : ViewEncapsulation.None
})
export class AlphaGlobalHeader implements AfterContentInit, AfterViewInit {

	private _isOpen: boolean;

	// search input open class
	public searchOpenClass: string;

	// top level menu items
	@ContentChildren( MenuItem, { descendants : false, read: ElementRef } ) menuItems: QueryList< ElementRef >;

	// sub menus
	@ContentChildren( SubMenu, { descendants : true, read: ElementRef } ) subMenus: QueryList< ElementRef >;

	// menu container
	@ViewChild('mainMenu') mainMenu: ElementRef;

	@Input('home') home: string;
	@Input('search') search: boolean;
	@Input('searchAction') searchAction: string;
	@Input('languages') languages: Array< any >;

	@HostListener( 'click', [ '$event' ] ) onMenuClick ( event ): void {

		if ( event.target.classList.contains ( 'sub-menu-toggle' ) )  {

			event.target.parentNode.classList.toggle( 'open' );
		}
	}

	@HostBinding( 'class.open' ) public get opened(): boolean {
		return this._isOpen;
	}

	public set collapsed( value: boolean ) {

		if ( value ) {
			this.elRef.nativeElement.classList.add( 'collapsed' );
		} else {
			this.elRef.nativeElement.classList.remove( 'collapsed' );
		}

	}

	public constructor(
		private elRef: ElementRef
	) {

	}

	/**
	 * Prepare sub-menu toggles
	 */
	public ngAfterContentInit(): void {

		this.subMenus
			.map( elRef => elRef.nativeElement )
			// .filter( elRef => elRef.nativeElement.classList.contains( 'menu-item-has-children' ) )
			.forEach(subMenu => {

				const tog = document.createElement( 'span' );
					tog.classList.add( 'sub-menu-toggle' );

				subMenu.parentNode.insertBefore( tog, subMenu );

			});

	}

	/**
	 * After view and content has been rendered, check the menu widths
	 */
	ngAfterViewInit(): void {

		// use our common menu sizing lib
		registerMenu( this.mainMenu.nativeElement, {

			// map config properties to css vars
			minItemSize : '@item-size',
			itemPadding : '@item-padding',
			fontSize : '@item-font-size',
			reservedWidth : '@menu-reserved-width',

			onCollapse : () => {
				this.collapsed = true;
			},
			onExpand : () => {
				this.collapsed = false;
			}

		} ).check();

	}
	/**
	 * Close Menu
	 */
	public close(): void {
		$htmlClasses.remove( 'nav-open' );
		this._isOpen = false;
	}

	/**
	 * Open Menu
	 */
	public open(): void {
		$htmlClasses.add( 'nav-open' );
		this._isOpen = true;
	}

	/**
	 * Toggle Menu
	 */
	public toggleMenu(): void {
		if ( this.opened ) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Toggle Search Input
	 */
	public toggleSearchInput(): void {
		this.searchOpenClass = this.searchOpenClass === 'open' ? '' : 'open';
	}

}
