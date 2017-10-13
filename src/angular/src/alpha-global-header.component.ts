import {
	Component,
	Input,
	ViewEncapsulation,
	AfterViewInit,
	ElementRef,
	HostListener

} from '@angular/core';

import { Router, NavigationStart } from '@angular/router';

import { AlphaHeader } from './util/menu-component';


@Component( {
	selector : 'alpha-global-header',
	template : `
	<a *ngIf="home" class="question-mark agh-icon-logo" id="mobileLogo" [routerLink]="home"></a>

	<div class="menu-container">

		<div *ngIf="home" class="before-menu">
			<a class="question-mark agh-icon-logo" [routerLink]="home"></a>
		</div>

		<div class="menu-area">

			<ul menu-container class="main-menu">

				<ng-content></ng-content>

			</ul>

		</div>

	</div>

  	`,
	styleUrls: ['../../../assets/less/styles/header.less'],
	encapsulation : ViewEncapsulation.None
})
export class AlphaGlobalHeader implements AfterViewInit {

	public header:AlphaHeader;

	@Input('home') home: Array<string>;
	@Input('search') search: boolean;
	@Input('search-action') searchAction: string;
	@Input('languages') languages: Array< any >;

	/**
	 * Since toolbar items (the profile icon) are moved around the dom, the router link breaks
	 * Let's listen for those router link requests and make them work
	 * @param event
	 */
	@HostListener('click', ['$event']) onClick( event ) {

		const targ:HTMLElement = event.target;

		if ( targ.hasAttribute( 'ng-reflect-router-link' ) && targ.hasAttribute( 'toolbar-item' ) ) {

			// router link value
			const link:string = targ.getAttribute( 'ng-reflect-router-link' );

			// convert link to router instruction
			const parts:Array<string> = link.split( ',' );//.map(path => '"'+path+'"');

			// navigate
			this.router.navigate( parts );

			// selected class link value
			targ.classList.add( targ.getAttribute( 'ng-reflect-router-link-active' ) );
		}

	}

	public constructor(
		private elRef: ElementRef,
		private router: Router
	) {

		/**
		 * Listen to navigation events
		 * Toolbar items that get moved around lose their ability to have their classes added / removed by angular
		 */
		this.router.events.subscribe(event => {

			if ( event instanceof NavigationStart ) {

				const selectedElements = this.elRef.nativeElement.querySelectorAll( '.current-menu-item' );

				let i:number = 0,
					len:number = selectedElements.length;

				for ( i; i < len; i++ ) {
					const el = selectedElements[ i ];

					// assuming current-menu-item
					// @todo make this dynamic
					el.classList.remove( 'current-menu-item' );
				}

				// close any open nav
				this.header.close();

			}


		})
	}


	/**
	 * After view and content has been rendered, check the menu widths
	 */
	public ngAfterViewInit(): void {

		// use our common menu sizing lib
		this.header = new AlphaHeader( this.elRef.nativeElement, {

			search : this.search ? { action : this.searchAction } : false,
			languages: this.languages

		} );

	}

}
