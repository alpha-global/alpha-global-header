import {
	Component,
	Input,
	ViewEncapsulation,
	AfterViewInit,
	OnDestroy,
	ElementRef,
	HostListener

} from '@angular/core';

import {
	Router,
	NavigationStart,
	NavigationEnd
} from '@angular/router';

import { AlphaHeader } from './util/menu-component';


@Component( {
	selector: 'alpha-global-header',
	template: `
	<a *ngIf="home" class="question-mark agh-icon-logo" id="mobileLogo" (click)="onHomeClick($event)" target="_blank"></a>

	<div class="menu-container">

		<div *ngIf="home" class="before-menu">
			<a class="question-mark agh-icon-logo" (click)="onHomeClick($event)" target="_blank"></a>
		</div>

		<div class="menu-area">

			<ul menu-container class="main-menu">

				<ng-content></ng-content>

			</ul>

		</div>

	</div>

  	`,
	styleUrls: [ '../../../assets/less/styles/header.less' ],
	encapsulation: ViewEncapsulation.None
} )
export class AlphaGlobalHeader implements AfterViewInit, OnDestroy {

	public header: AlphaHeader;

	@Input( 'home' ) home: Array<string>;
	@Input( 'search' ) search: boolean;
	@Input( 'search-action' ) searchAction: string;
	@Input( 'languages' ) languages: Array<any> = [];

	/**
	 * Close menu when clicking on self link
	 *
	 * @param event
	 */
	@HostListener( 'click', [ '$event' ] ) onClick ( event ) {

		const targ: HTMLElement = event.target,
			isRouterLink: boolean = targ.hasAttribute( 'href' );

		if ( isRouterLink ) {
			// close the nav (should close by itself but when clicking on own items no navigation occurs)
			this.header.close();
		}

	}

	public constructor (
		private elRef: ElementRef,
		private router: Router
	) {

		/**
		 * Listen to navigation events
		 * Toolbar items that get moved around lose their ability to have their classes added / removed by angular
		 */
		this.router.events.subscribe( event => {

			if ( !this.header ) {
				return;
			}

			if ( event instanceof NavigationStart ) {

				// close any open nav
				this.header.close();

			}

		} )
	}


	/**
	 * After view and content has been rendered, check the menu widths
	 */
	public ngAfterViewInit (): void {

		// use our common menu sizing lib
		this.header = new AlphaHeader( this.elRef.nativeElement, {

			search: this.search ? { action: this.searchAction } : false,
			languages: this.languages,
			closeSubMenusOnClick: true

		} );

	}

	/**
	 * on click of the home link either use the router, or allow to open in new tab
	 * @param event
	 */
	public onHomeClick ( event: MouseEvent ) {

		if ( this.home instanceof Array ) {

			event.preventDefault();

			this.router.navigate( this.home );

		} else {
			const link: HTMLElement = event.target as HTMLElement;
			link.setAttribute( 'href', this.home );
		}
	}

	/**
	 * Cleanup on destroy
	 */
	public ngOnDestroy (): void {

		this.header.destroy();
	}

}
