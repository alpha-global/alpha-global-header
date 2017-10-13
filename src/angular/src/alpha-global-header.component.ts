import {
	Component,
	Input,
	ViewEncapsulation,
	AfterViewInit,
	ElementRef,

} from '@angular/core';

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

	@Input('home') home: Array<string>;
	@Input('search') search: boolean;
	@Input('search-action') searchAction: string;
	@Input('languages') languages: Array< any >;

	public constructor(
		private elRef: ElementRef
	) {

	}


	/**
	 * After view and content has been rendered, check the menu widths
	 */
	public ngAfterViewInit(): void {

		// use our common menu sizing lib
		const header:AlphaHeader = new AlphaHeader( this.elRef.nativeElement, {

			search : this.search ? { action : this.searchAction } : false,
			languages: this.languages

		} );

	}

}
